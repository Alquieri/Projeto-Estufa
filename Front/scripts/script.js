import {service} from "./firebaseConnect.js"

service.user = "Estufafa"

const bomba =  document.getElementById("bomba")
const cooler =  document.getElementById("cooler")

const umidade = document.getElementById("umidade-data")
const temp_int = document.getElementById("temperatura-data-int")
const luz = document.getElementById("luminosidade-data") 

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
    luz.textContent = data.Sensor.Luz

}


const puxa_Acionadores = async () => {


    bomba.textContent = data.Acionadores.Bomba ? '1' : '0'
    // valueBomba = data.Acionadores.Bomba
    
    cooler.textContent = data.Acionadores.Cooler ? '1' : '0' 
    // valueIrrigacao = data.Acionadores.Irrigacao

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





// -------CALENDARIO------

document.getElementById('buscar-data').addEventListener('click', function () {
  const calendario = document.getElementById('input-date').value;

  console.log(calendario)


});

setInterval(() => {
    load_data();

}, 1000);




