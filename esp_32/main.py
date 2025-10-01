import network
import urequests
import ujson
from machine import ADC, Pin, PWM
import time
import dht

#Davi
#Credenciais do WIFI
nome = "Ana Queiroz"
senha = "Anabanana"
    
# Endereço do firebase
firebase = "https://greengarden-fd823-default-rtdb.firebaseio.com/"
user = "Estufafa"
url = firebase + user

headers = {
    "Content-Type": "application/json",
}


def conectarWifi():
    pass

    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print("Conectando no WiFi...")
        wlan.connect(nome, senha)
        while not wlan.isconnected():
            pass
    print("Wifi conectado... IP: {}".format(wlan.ifconfig()[0]))
            
def getData():
    response = urequests.get(url + '.json', headers=headers)

    if response.status_code == 200:
        data = ujson.loads(response.text)
        #print("Firebase Response:", data)
    else:
        print("Failed to retrieve data. Status code:", response.status_code)
    
    response.close()
    return data


def enviarFire(data, complement = ""): #inserir no data
    response = urequests.put(url + "/" + complement + "/" + '.json', data=ujson.dumps(data), headers=headers)
    print("Firebase Response:", response.text)
    response.close()
#--------------------------------------------
    
    
conectarWifi()

# FUNÇOES PARA LIGAR AS COISINHAS
bomba_pin  = Pin(5, Pin.OUT)
cooler_pin = Pin(4, Pin.OUT)

data = {}


# FUNÇOES PARA MANDAR AS COISINHAS
dht_sensor = dht.DHT11(Pin(25))
ldr = ADC(Pin(34))
ldr.atten(ADC.ATTN_11DB)  
ldr.width(ADC.WIDTH_12BIT)


while True:
    # FUNÇOES PARA LIGAR AS COISINHAS
    data = getData()
    print("[GET]")
    
    cooler_status = data["Acionadores"]["Cooler"]
    bomba_status = data["Acionadores"]["Bomba"]    
        
    if bomba_status:
        #print("bomba : ", bomba_status)
        bomba_pin.value(1)
    else:
        #print("bomba : ", bomba_status)
        bomba_pin.value(0)
        
    if cooler_status:
        #print("Cooler : ", cooler_status)
        cooler_pin.value(1)
    else:
        #print("Cooler : ", cooler_status)
        cooler_pin.value(0)
    time.sleep_ms(100)
    
    # FUNÇOES PARA MANDAR AS COISINHAS
    
    try:
        dht_sensor.measure()
        temp = dht_sensor.temperature()
        hum = dht_sensor.humidity()
        ldr_value = ldr.read()
        porcentagem = (ldr_value / 4095) * 100

        temp_temp = (5000/3) * (temp - 20)
        temp_temp = round(temp_temp)
        print("Temperatura: " + str(temp) + "%")
        print("Humidade: " + str(hum) + "%")
        print("Luminosidade: " + str(round(porcentagem,2)) + "%")
        
        time.sleep_ms(100)
        # temperaturas.json
        sensor = {
            "Temperatura": temp,
            "Umidade": hum,
            "Luminosidade": round(porcentagem,2)
        }
        
        enviarFire(sensor, "Sensor")
        print("[POST]")
        
        

    except OSError as e:
        print("FALHAAA", e)
     
    
    print()
    
    
        

