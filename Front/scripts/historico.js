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

    data.forEach(item => {
        const hora = new Date(item.createdAt).getHours(); 
        if (!dadosPorHora[hora]) {
            dadosPorHora[hora] = {
                temperaturas: [],
                umidades: [],
                luzes: []
            };
        }
        dadosPorHora[hora].temperaturas.push(item.Temperatura);
        dadosPorHora[hora].umidades.push(item.Umidade);
        dadosPorHora[hora].luzes.push(item.Luz);
    });

    const labels = []; 
    const mediasTemp = [];
    const mediasUmi = [];
    const mediasLuz = [];

    for (let i = 0; i < 24; i++) {
        labels.push(`${i}:00`); 
        if (dadosPorHora[i]) {
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

    
    if (temperaturaChart) temperaturaChart.destroy();
    if (umidadeChart) umidadeChart.destroy();
    if (luzChart) luzChart.destroy();

    const corGrafico = '#f1e421ff';

    const ctxTemp = document.getElementById('temperaturaChart').getContext('2d');
    temperaturaChart = new Chart(ctxTemp, {
        type: 'line', 
        data: {
            labels: labels,
            datasets: [{
                label: 'Média de Temperatura (°C)',
                data: mediasTemp,
                borderColor: corGrafico,
                backgroundColor: 'rgba(164, 24, 86, 0.2)',
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
            }
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
                borderColor: corGrafico,
                backgroundColor: 'rgba(164, 24, 86, 0.2)',
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
                borderColor: corGrafico,
                backgroundColor: 'rgba(164, 24, 86, 0.2)',
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
            }
        }
    });
}