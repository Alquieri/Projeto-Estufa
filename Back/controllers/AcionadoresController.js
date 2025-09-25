const Acionadores = require('../models/Acionadores.js')

module.exports = {

    async PostAcionadores(req,res)
    {
        res.status(200).json({ message: "Success!" });
    }
}
