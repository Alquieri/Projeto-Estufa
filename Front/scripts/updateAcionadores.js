const apiBaseUrl1 = "http://localhost:8080/api/acionadores";

const updateControls = async (index) => {
    const acionadorDataElements = document.querySelectorAll(".acionador-data");

    if (acionadorDataElements.length === 0) {
        console.error("Nenhum elemento com a classe .acionador-data foi encontrado.");
        return;
    }

    const element = acionadorDataElements[index];
    if (!element) {
        console.error(`Elemento no índice ${index} não encontrado.`);
        return;
    }

    const estadoAtual = parseInt(element.textContent.trim(), 10); 
    const estadoInvertido = estadoAtual === 1 ? 0 : 1; 
    console.log(`Círculo clicado no índice ${index}, valor: ${estadoAtual}`); 

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        index: index + 1, 
        body: JSON.stringify({ index: ++index, estado: estadoInvertido }) 
    };

    try {
        const response = await fetch(`${apiBaseUrl1}/atualizar-valvulas/${index}`, requestOptions);
        if (!response.ok) {
            throw new Error(`Erro ao atualizar o acionador no índice ${index}: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Acionador no índice ${index} atualizado com sucesso: (${estadoInvertido}) `, data);
    } catch (error) {
        console.error(`Erro ao atualizar o acionador no índice ${index}:`, error);
    }

    try {
        const response = await fetch(`${apiBaseUrl1}/atualizar-bomba/${index}`, requestOptions);
        if (!response.ok) {
            throw new Error(`Erro ao atualizar o acionador no índice ${index}: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Acionador no índice ${index} atualizado com sucesso: (${estadoInvertido}) `, data);
    } catch (error) {
        console.error(`Erro ao atualizar o acionador no índice ${index}:`, error);
    }

    try {
        const response = await fetch(`${apiBaseUrl1}/atualizar-irrigacao/${index}`, requestOptions);
        if (!response.ok) {
            throw new Error(`Erro ao atualizar o acionador no índice ${index}: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Acionador no índice ${index} atualizado com sucesso: (${estadoInvertido}) `, data);
    } catch (error) {
        console.error(`Erro ao atualizar o acionador no índice ${index}:`, error);
    }

    fetchLatestAcionadorData(); // Atualiza os dados após a alteração
};

document.addEventListener("DOMContentLoaded", () => {
    const circulos = document.querySelectorAll(".circulo");

    circulos.forEach((circulo, index) => {
        circulo.addEventListener("click", () => {
            console.log(`Círculo clicado no índice ${index}`);
            updateControls(index); // Chama a função passando o índice do círculo clicado
        });
    });

    fetchLatestAcionadorData();
});

async function fetchLatestAcionadorData() {
    try {
        const response = await fetch(`${apiBaseUrl1}/valores`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        updateAcionadorDisplay(data);
    } catch (error) {
        console.error("Erro ao buscar os dados mais recentes:", error);
    }
}

function updateAcionadorDisplay(data) {
    const acionadorDataElements = document.querySelectorAll(".acionador-data");
    if (acionadorDataElements.length >= 3) {
        acionadorDataElements[0].textContent = `${data[0].estado || 0}`;
        acionadorDataElements[1].textContent = `${data[1].estado || 0}`;
        acionadorDataElements[2].textContent = `${data[2].estado || 0}`;
    } else {
        console.error("Elementos .acionador-data não encontrados no DOM.");
    }
}

document.querySelectorAll('.circulo').forEach((button, index) => {
    button.addEventListener('click', () => {
        const acionadorDataElements = document.querySelectorAll(".acionador-data");
        const element = acionadorDataElements[index]; // Obtém o elemento correspondente ao botão
        if (!element) {
            console.error(`Elemento acionador-data no índice ${index} não encontrado.`);
            return;
        }

        const estado = parseInt(element.textContent.trim(), 10); // Converte o estado para número
        if (estado === 0) {
            button.classList.add('ativo'); // Adiciona a classe 'ativo' se o estado for 1
        } else {
            button.classList.remove('ativo'); // Remove a classe 'ativo' caso contrário
        }
    });
});


