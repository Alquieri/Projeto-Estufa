// const apiBaseUrl = "http://localhost:8080/api/sensores";

// async function fetchLatestSensorData() {
//     try {
//         const response = await fetch(`${apiBaseUrl}/latest`);
//         if (!response.ok) {
//             throw new Error(`Erro ao buscar dados: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log(data)
//         updateSensorDisplay(data);
//     } catch (error) {
//         console.error("Erro ao buscar os dados mais recentes:", error);
//     }
// }

// function updateSensorDisplay(data) {
//     const sensorDataElements = document.querySelectorAll(".sensor-data");
//     if (sensorDataElements.length >= 3) {
//         sensorDataElements[0].textContent = `${data.umidade || 0}%`; // Umidade
//         sensorDataElements[1].textContent = `${data.temperatura_interna || 0}°C`; // Temperatura interna
//         sensorDataElements[2].textContent = `${data.temperatura_externa || 0}°C`;
//         // sensorDataElements[3].textContent = `${data.nivel_agua || 0}%`; 
//     } else {
//         console.error("Elementos .sensor-data não encontrados no DOM.");
//     }
// }

// document.addEventListener("DOMContentLoaded", fetchLatestSensorData);