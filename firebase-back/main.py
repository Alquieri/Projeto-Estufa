from lib import FireKeeper

url : str = "https://greengarden-fd823-default-rtdb.firebaseio.com"
fireKeeper = FireKeeper(url, "Estufafa/Sensor", "http://localhost:8080/Sensor", 10)


fireKeeper.AddListener("Luminosidade")
fireKeeper.AddListener("Umidade")
fireKeeper.AddListener("Temperatura")

while True:
    fireKeeper.ListenAll()