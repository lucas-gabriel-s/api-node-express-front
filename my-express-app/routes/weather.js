const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:city', async (req, res) => {
    const city = req.params.city;

    try {
        // Primeiro, obtemos as coordenadas da cidade usando a API Nominatim (OpenStreetMap)
        const geocodingResponse = await axios.get(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`);

        if (geocodingResponse.data.length === 0) {
            return res.status(404).json({ message: 'City not found' });
        }

        const { lat, lon } = geocodingResponse.data[0];

        // Em seguida, usamos as coordenadas para obter os dados climáticos da API Open-Meteo
        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);

        const { temperature, windspeed, is_day } = weatherResponse.data.current_weather;

        const weatherInfo = {
            cidade: city,
            temperatura: `${temperature} °C`,
            velocidade_do_vento: `${windspeed} km/h`,
            periodo_do_dia: is_day ? 'Dia' : 'Noite',
        };

        res.json(weatherInfo);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ message: 'Error fetching weather data', error: error.response.data });
        } else {
            res.status(500).json({ message: 'Error fetching weather data', error: error.message });
        }
    }
});

module.exports = router;
