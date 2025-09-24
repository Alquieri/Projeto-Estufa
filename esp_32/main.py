import network
import urequests
import ujson
from machine import ADC, Pin, PWM
import time
import dht


#Credenciais do WIFI
nome = "POCO X7 Pro"
senha = "12345678"
    
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
valvula_pin = Pin(4, Pin.OUT)
bomba_pin = Pin(5, Pin.OUT)
irrigacao_pin = Pin(23, Pin.OUT)
data = {}


# FUNÇOES PARA MANDAR AS COISINHAS
dht_sensor = dht.DHT11(Pin(32))

while True:
    # FUNÇOES PARA LIGAR AS COISINHAS
    data = getData()
    print("[GET]")
    
    valvula_status = data["Acionadores"]["Valvula"]
    bomba_status = data["Acionadores"]["Bomba"]
    irrigacao_status = data["Acionadores"]["Irrigacao"]
    
    if valvula_status:
       # print("valvula : ", valvula_status)
        valvula_pin.value(1)
    else:
       # print("valvula : ", valvula_status)
        valvula_pin.value(0)
        
    if bomba_status:
       # print("bomba : ", bomba_status)
        bomba_pin.value(1)
    else:
       # print("bomba : ", bomba_status)
        bomba_pin.value(0)
        
    if irrigacao_status:
      #  print("irrigacao : ", irrigacao_status)
        irrigacao_pin.value(1)
    else:
        #print("irrigacao : ", irrigacao_status)
        irrigacao_pin.value(0)
    time.sleep_ms(100)
    
    # FUNÇOES PARA MANDAR AS COISINHAS

    
    try:
        dht_sensor.measure()
        temp = dht_sensor.temperature()
        hum = dht_sensor.humidity()

        temp_temp = (5000/3) * (temp - 20)
        temp_temp = round(temp_temp)
        print(temp)
        print(hum)
        
        time.sleep_ms(100)
        # temperaturas.json
        sensor = {
            "Temperatura": temp,
            "Umidade": hum
        }
        
        enviarFire(sensor, "Sensor")
        print("[POST]")
        
        

    except OSError as e:
        print("FALHAAA", e)
     
    
    print()
    
    
        
  
   
    
    
    
    
    

     
            
            
            
