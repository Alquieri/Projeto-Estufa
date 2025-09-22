import {service} from "./firebaseConnect.js"

service.user = "GUI"

const valvula =  document.getElementById("valvula")
const bomba =  document.getElementById("bomba")
const irrigacao =  document.getElementById("irrigacao")

let valueValvula = false
let valueBomba = false
let valueIrrigacao = false

let data = {}
const load_data = async () => {
    data = await service.load();    
    
}
load_data()

const puxa_Acionadores = async () => {

    valvula.textContent = data.Acionadores.Valvula ? '1' : '0'
    
    bomba.textContent = data.Acionadores.Bomba ? '1' : '0'
    
    irrigacao.textContent = data.Acionadores.Irrigacao ? '1' : '0' 

}


const set_data = async () => {
    await load_data(); 
    data.Acionadores = {"Valvula" : valueValvula, "Bomba" : valueBomba, "Irrigacao" : valueIrrigacao}
    puxa_Acionadores();
    service.set(data)
}


valvula.addEventListener('click', () => {
    valueValvula = !valueValvula
    console.log("valueValvula")      
    set_data();
    console.log(data.Acionadores.Valvula)
    });

bomba.addEventListener('click', () => {
    console.log("valueBomba")
    valueBomba = !valueBomba
    set_data();
    console.log(data.Acionadores.Bomba)
    });

irrigacao.addEventListener('click', () => {
    console.log("valueIrrigacao")
    valueIrrigacao = !valueIrrigacao
    set_data();
    console.log(data.Acionadores.Irrigacao)

    });


// puxa_Acionadores();


// setInterval(() => {
//     load_data();
// }, 10000);




