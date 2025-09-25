const Acionadores = require('../models/Acionadores');

module.exports = {
  async updateAcionador(req, res) {
    const { id } = req.params;
    const novosDados = req.body;

    try {
      const acionador = await Acionadores.findByPk(id);

      if (!acionador) {
        return res.status(404).json({ error: 'Acionador não encontrado' });
      }

      // Atualiza todos os campos que vierem em novosDados
      await acionador.update(novosDados);

      return res.status(200).json(acionador);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar acionador', detalhes: error.message });
    }

  },

  async getAcionadores(req, res) {
    try {
      const dados = await Acionadores.findAll();
      res.status(200).json(dados);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar acionadores', detalhes: error.message });
    }
  }
};
