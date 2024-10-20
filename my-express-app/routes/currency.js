const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = 'YOUR_EXCHANGE_RATE_API_KEY'; // Substitua pela sua chave de API, se necessário.

router.get('/:from/:to/:amount', async (req, res) => {
    const { from, to, amount } = req.params;
    try {
        // Requisição para obter a taxa de câmbio
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const rate = response.data.rates[to];
        const convertedAmount = (rate * amount).toFixed(2);

        // Resposta em português
        res.json({
            de: from,
            para: to,
            quantia: amount,
            taxa_de_cambio: rate,
            valor_convertido: `${convertedAmount} ${to}`
        });
    } catch (error) {
        // Mensagem de erro em português
        res.status(500).json({
            mensagem: 'Erro ao buscar dados de câmbio',
            erro: error.message
        });
    }
});

module.exports = router;
