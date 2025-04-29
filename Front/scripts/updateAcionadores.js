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

    const estadoAtual = parseInt(element.textContent.trim(), 10); // Converte o estado para número
    const estadoInvertido = estadoAtual === 1 ? 0 : 1; // Inverte o estado
    console.log(`Círculo clicado no índice ${index}, valor: ${estadoAtual}`); // Log do índice clicado

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        index: index + 1, // Adiciona o índice ao corpo da requisição
        body: JSON.stringify({ index: ++index, estado: estadoInvertido }) // Envia o índice e o valor no corpo da requisição
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

document.addEventListener("DOMContentLoaded", fetchLatestAcionadorData);