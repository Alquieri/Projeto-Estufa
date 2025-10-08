import {service} from "./firebaseConnect.js"

service.user = "Estufafa"

const bomba =  document.getElementById("bomba")
const cooler = document.getElementById("cooler")
const manual = document.getElementById("manual") 

const umidade = document.getElementById("umidade-data")
const temp_int = document.getElementById("temperatura-data-int")
const luz = document.getElementById("luminosidade-data")


const url = "http://localhost:8080"
let data = {}

let valueBomba = false
let valueCooler = false
let acionadoresAtivos = false
let valueManual = false

const load_data = async () => {
    data = await service.load(); 
    
    valueBomba = data.Acionadores.Bomba;
    valueCooler = data.Acionadores.Cooler;
    valueManual = data.Acionadores.Manual;

    puxa_Acionadores();

    umidade.textContent = data.Sensor.Umidade
    temp_int.textContent = data.Sensor.Temperatura
    luz.textContent = data.Sensor.Luminosidade

    updateAcionadoresStatus();
}


const puxa_Acionadores = async () => {


    bomba.textContent = data.Acionadores.Bomba ? '1' : '0'
    
    cooler.textContent = data.Acionadores.Cooler ? '1' : '0' 

}

load_data()


const set_data = async () => {
    
    data.Acionadores = { "Bomba" : valueBomba, "Cooler" : valueCooler, "Manual" : valueManual, "AcionadoresAtivos" : acionadoresAtivos}
    puxa_Acionadores();
    service.set(data)
}


const updateAcionadoresStatus = () => {
  acionadoresAtivos = valueManual; // acionadoresAtivos é true se manual estiver ativado

  if (acionadoresAtivos) {
    // Manual ativado -> acionadores clicáveis
    bomba.style.pointerEvents = 'auto';
    cooler.style.pointerEvents = 'auto';
    bomba.style.opacity = '1';
    cooler.style.opacity = '1';
  } else {
    // Manual desativado -> acionadores desativados
    bomba.style.pointerEvents = 'none';
    cooler.style.pointerEvents = 'none';
    bomba.style.opacity = '0.5';
    cooler.style.opacity = '0.5';
  }
  set_data();
}


manual.addEventListener('click', () => {
    valueManual = !valueManual
    updateAcionadoresStatus();
    set_data();
    console.log("Manual:", valueManual)
    });


bomba.addEventListener('click', () => {
    if (!acionadoresAtivos) return; 
    valueBomba = !valueBomba;
    set_data();
    console.log("valueBomba", valueBomba);
});

cooler.addEventListener('click', () => {
    if (!acionadoresAtivos) return;
    valueCooler = !valueCooler;
    set_data();
    console.log("valueCooler", valueCooler);
});



setInterval(() => {
    load_data();
  
}, 1000);




