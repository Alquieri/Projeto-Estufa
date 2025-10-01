const Sensor = require('../models/Sensor.js')
const { Op } = require('sequelize');

module.exports = {

    async PostSensor(req,res)
    {
        const data = req.body; 

        await Sensor.create({
            Luz : data.Luz,
            Temperatura : data.Temperatura,
            Umidade : data.Umidade
        })
        console.log('Sensores :', data);
        res.status(200).json({ message: "Success!" });
    },


// #COMO FAZER O MINHA DATA VIR PRO BACK AQUI 

     async GetSensorByDate(req,res){
        const date = req.params.date


    const inicioDoDia = new Date(`${date}T00:00:00.000Z`);
    const fimDoDia = new Date(`${date}T23:59:59.999Z`);




        try {
       const ByDate = await Sensor.findAll({
        where: {
            createdAt: { [Op.between]: [inicioDoDia , fimDoDia] } 
        }
        });

        if (!ByDate) {
        return res.status(404).json({ message: "Nenhum resultado para essa data" });
        }

            res.json(ByDate);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar essa data", error });
        }

    },



    async GetLastPost(req, res) {
    try {
        const lastSensor = await Sensor.findOne({
        order: [['createdAt', 'DESC']],
        });

        if (!lastSensor) {
        return res.status(404).json({ message: "Nenhum post encontrado" });
        }

        res.json(lastSensor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar último post", error });
    }
    }


    
}
