// const apiBaseUrl2 = "http://localhost:8080/api/sensores";

// document.getElementById("buscar-data").addEventListener("click", async () => {
//     const dataSelecionada = document.querySelector(".input-date").value;

//     if (!dataSelecionada) {
//         alert("Selecione uma data!");
//         return;
//     }

//     try {
//         const response = await fetch(`${apiBaseUrl}/por-data?date=${dataSelecionada}`);
//         if (!response.ok) {
//             throw new Error("Nenhum dado encontrado para essa data");
//         }

//         const dados = await response.json();

//         // Atualiza os sensores com o primeiro dado encontrado do dia
//         if (dados.length > 0) {
//             updateSensorDisplay(dados[0]); // Usa a mesma função do outro script
//         } else {
//             alert("Nenhum dado disponível para a data selecionada.");
//         }

//     } catch (error) {
//         console.error("Erro ao buscar dados pela data:", error);
//         alert("Erro ao buscar dados pela data. Verifique o console.");
//     }
// });
