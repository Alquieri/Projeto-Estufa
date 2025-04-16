const apiBaseUrl1 = "http://localhost:8080/api/acionadores";

async function fetchLatestAcionadorData() {
    try {
        const response = await fetch(`${apiBaseUrl1}/latest`);
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
        acionadorDataElements[0].textContent = `${data.valvulas || 0}`;
        acionadorDataElements[1].textContent = `${data.irrigacao || 0}`;
        acionadorDataElements[2].textContent = `${data.bomba || 0}`;
    } else {
        console.error("Elementos .acionador-data não encontrados no DOM.");
    }
}

document.addEventListener("DOMContentLoaded", fetchLatestAcionadorData);