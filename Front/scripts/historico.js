
window.addEventListener('DOMContentLoaded', (event) => {
    const calendarioInput = document.getElementById('input-date');

    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;

    calendarioInput.value = dataFormatada;
    document.getElementById('buscar-data').click(); 
});




const url = "http://localhost:8080";

let temperaturaChart, umidadeChart, luzChart;


document.getElementById('buscar-data').addEventListener('click', async function () {
    const calendario = document.getElementById('input-date').value;

    if (!calendario) {
        alert('Por favor, selecione uma data.');
        return;
    }

    try {
        const response = await fetch(url + "/get/sensor/data/" + calendario, {
            method: 'GET'
        });

        console.log(response.status);

        if (response.ok) {
            const data = await response.json();
            console.log('Dados recebidos:', data);

            if (data.length === 0) {
                alert('Nenhum dado encontrado para esta data.');
                return;
            }

            processarErenderizarGraficos(data);
        } else {
            console.log('Erro na requisição:', response.statusText);
            alert('Erro ao buscar os dados. Verifique o console para mais detalhes.');
        }
    } catch (error) {
        console.error('Erro na conexão:', error);
        alert('Não foi possível conectar ao servidor.');
    }
});

function processarErenderizarGraficos(data) {
    const dadosPorHora = {};
    console.log("--- INICIANDO DIAGNÓSTICO DO LOOP ---");
    data.forEach((item, index) => {
        console.log(`[Item ${index}] Lendo o item original:`, item);

        if (!item.createdAt || typeof item.createdAt !== 'string') {
            console.error(`[Item ${index}] ERRO: 'createdAt' está faltando ou não é texto.`);
            return;
        }

        const stringDaData = item.createdAt;
        console.log(`[Item ${index}] String da data encontrada: "${stringDaData}"`);

        const pedacoDaHora = stringDaData.substring(11, 13);
        console.log(`[Item ${index}] Pedaço da string extraído para a hora: "${pedacoDaHora}"`);

        const hora = parseInt(pedacoDaHora, 10);
        console.log(`[Item ${index}] Hora convertida para número:`, hora);

        if (isNaN(hora)) {
            console.error(`[Item ${index}] ERRO CRÍTICO: A hora virou 'NaN' (Não é um Número). Pulando.`);
            return; 
        }

        if (!dadosPorHora[hora]) {
            dadosPorHora[hora] = { temperaturas: [], umidades: [], luzes: [] };
            console.log(`[Item ${index}] Criei um novo grupo para a hora ${hora}`);
        }
        dadosPorHora[hora].temperaturas.push(item.Temperatura);
        dadosPorHora[hora].umidades.push(item.Umidade);
        dadosPorHora[hora].luzes.push(item.Luz);
    });
    console.log("--- DIAGNÓSTICO FINALIZADO ---");
    console.log("Resultado final do objeto 'dadosPorHora':", dadosPorHora);

    const labels = []; 
    const mediasTemp = [];
    const mediasUmi = [];
    const mediasLuz = [];

    for (let i = 0; i < 24; i++) {
        labels.push(`${i}:00`); 
        if (dadosPorHora.hasOwnProperty(i)) {
            const tempSoma = dadosPorHora[i].temperaturas.reduce((a, b) => a + b, 0);
            mediasTemp.push(tempSoma / dadosPorHora[i].temperaturas.length);

            const umiSoma = dadosPorHora[i].umidades.reduce((a, b) => a + b, 0);
            mediasUmi.push(umiSoma / dadosPorHora[i].umidades.length);

            const luzSoma = dadosPorHora[i].luzes.reduce((a, b) => a + b, 0);
            mediasLuz.push(luzSoma / dadosPorHora[i].luzes.length);
        } else {
            mediasTemp.push(null);
            mediasUmi.push(null);
            mediasLuz.push(null);
        }
    }
    console.log('DADOS FINAIS PARA OS GRÁFICOS:', { labels, mediasTemp, mediasUmi, mediasLuz });
    
    if (temperaturaChart) temperaturaChart.destroy();
    if (umidadeChart) umidadeChart.destroy();
    if (luzChart) luzChart.destroy();

    const corGraficoLuz = '#f1e421ff';
    const corGraficoUmi = '#2147f1ff';
    const corGraficoTemp = '#21f121ff';

    const ctxTemp = document.getElementById('temperaturaChart').getContext('2d');
    temperaturaChart = new Chart(ctxTemp, {
        type: 'line', 
        data: {
            labels: labels,
            datasets: [{
                label: 'Média de Temperatura (°C)',
                data: mediasTemp,
                borderColor: corGraficoTemp,
                backgroundColor: 'rgba(44, 100, 12, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Temperatura Média por Hora'
                }
            },
            scales: { 
                    y: {
                        min: 10,   
                        max: 40   
                    }
        },
     
    }

    });

    const ctxUmi = document.getElementById('umidadeChart').getContext('2d');
    umidadeChart = new Chart(ctxUmi, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Média de Umidade (%)',
                data: mediasUmi,
                borderColor: corGraficoUmi,
                backgroundColor: 'rgba(33, 178, 189, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Umidade Média por Hora'
                }
            },
            scales: { 
                    y: {
                        min: 0,   
                        max: 100   
                    }
            }
        }
    });

    const ctxLuz = document.getElementById('luzChart').getContext('2d');
    luzChart = new Chart(ctxLuz, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Média de Luminosidade',
                data: mediasLuz,
                borderColor: corGraficoLuz,
                backgroundColor: 'rgba(238, 197, 14, 0.33)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Luminosidade Média por Hora'
                }
                },
            scales: { 
                y: {
                    min: 0,   
                    max: 100   
                }
            }
        }
    });
}