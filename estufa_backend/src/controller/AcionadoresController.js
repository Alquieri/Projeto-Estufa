const pool = require('../startup/db');

class AcionadoresController {
    static async getById(req, res) {
        const { id } = req.params;

        if (!id) return res.status(400).send({ message: "No id provided" });

        try {
            const [rows] = await pool.execute('SELECT * FROM acionadores WHERE id = ?', [id]);
            if (rows.length === 0)
                return res.status(404).send({ message: "Acionador não encontrado" });

            return res.status(200).json(rows[0]);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    static async getAllAcionadores(req, res) {
        try {
            const [rows] = await pool.execute('SELECT * FROM acionadores');
            return res.status(200).json(rows);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    static async updateValvulas(req, res) {
        const { id } = req.params;
        const { valvulas } = req.body;
        if (!id) return res.status(400).send({ message: "No id provided" });
     

        try {
            const [rows] = await pool.execute('UPDATE acionadores SET valvulas = ? WHERE id = ?', [valvulas, id]);
            if (rows.affectedRows === 0)
                return res.status(404).send({ message: "Acionador não encontrado" });

            return res.status(200).json({ message: "Valvula atualizada com sucesso" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    static async updateIrrigacao(req, res) {
        const { id } = req.params;
        const { irrigacao } = req.body;
        if (!id) return res.status(400).send({ message: "No id provided" });

        try {
            const [rows] = await pool.execute('UPDATE acionadores SET irrigacao = ? WHERE id = ?', [irrigacao, id]);
            if (rows.affectedRows === 0)
                return res.status(404).send({ message: "Acionador não encontrado" });

            return res.status(200).json({ message: "Irrigacao atualizada com sucesso" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    static async updateBomba(req, res) {
        const { id } = req.params;
        const { bomba } = req.body;
        if (!id) return res.status(400).send({ message: "No id provided" });

        try {
            const [rows] = await pool.execute('UPDATE acionadores SET bomba = ? WHERE id = ?', [bomba, id]);
            if (rows.affectedRows === 0)
                return res.status(404).send({ message: "Acionador não encontrado" });

            return res.status(200).json({ message: "Bomba atualizada com sucesso" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    static async getLatest(req, res) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM acionadores ORDER BY timestamp DESC LIMIT 1'
            );

            if (rows.length === 0) {
                return res.status(404).send({ message: "Nenhum dado encontrado" });
            }

            return res.status(200).json(rows[0]);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}

module.exports = AcionadoresController;