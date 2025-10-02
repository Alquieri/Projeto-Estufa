import {service} from "./firebaseConnect.js"

service.user = "Estufafa"

const bomba =  document.getElementById("bomba")
const cooler =  document.getElementById("cooler")

const umidade = document.getElementById("umidade-data")
const temp_int = document.getElementById("temperatura-data-int")
const luz = document.getElementById("luminosidade-data") 

const url = "http://localhost:8080"
let data = {}

let valueBomba = false
let valueCooler = false


const load_data = async () => {
    data = await service.load(); 
    
    valueBomba = data.Acionadores.Bomba;
    valueCooler = data.Acionadores.Cooler;

    puxa_Acionadores();

    umidade.textContent = data.Sensor.Umidade
    temp_int.textContent = data.Sensor.Temperatura
    luz.textContent = data.Sensor.Luminosidade

}


const puxa_Acionadores = async () => {


    bomba.textContent = data.Acionadores.Bomba ? '1' : '0'
    
    cooler.textContent = data.Acionadores.Cooler ? '1' : '0' 

}
load_data()


const set_data = async () => {
    
    data.Acionadores = { "Bomba" : valueBomba, "Cooler" : valueCooler}
    puxa_Acionadores();
    service.set(data)
}




bomba.addEventListener('click', () => {
    console.log("valueBomba")
    valueBomba = !valueBomba
    set_data();
    console.log(data.Acionadores.Bomba)
    });

cooler.addEventListener('click', () => {
    console.log("valueCooler")
    valueCooler = !valueCooler
    set_data();
    console.log(data.Acionadores.Cooler)

    });





setInterval(() => {
    load_data();

}, 1000);




