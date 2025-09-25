import {service} from "./firebaseConnect.js"

service.user = "Estufafa"

const valvula =  document.getElementById("valvula")
const bomba =  document.getElementById("bomba")
const irrigacao =  document.getElementById("irrigacao")

const umidade = document.getElementById("umidade-data")
const temp_int = document.getElementById("temperatura-data-int")
const luz = document.getElementById("luminosidade-data") 

let data = {}

let valueValvula = false
let valueBomba = false
let valueIrrigacao = false


const load_data = async () => {
    data = await service.load(); 
    
    valueValvula = data.Acionadores.Valvula;
    valueBomba = data.Acionadores.Bomba;
    valueIrrigacao = data.Acionadores.Irrigacao;

    puxa_Acionadores();

    umidade.textContent = data.Sensor.Umidade
    temp_int.textContent = data.Sensor.Temperatura
    luz.textContent = data.Sensor.Luz

}


const puxa_Acionadores = async () => {

    valvula.textContent = data.Acionadores.Valvula ? '1' : '0'
    // valueValvula = data.Acionadores.Valvula

    bomba.textContent = data.Acionadores.Bomba ? '1' : '0'
    // valueBomba = data.Acionadores.Bomba
    
    irrigacao.textContent = data.Acionadores.Irrigacao ? '1' : '0' 
    // valueIrrigacao = data.Acionadores.Irrigacao

}
load_data()


const set_data = async () => {
    
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



setInterval(() => {
    load_data();

}, 1000);




