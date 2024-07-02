const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());

const apiKey = '336f3097ab5094ba91c87ea89c0de8e7';

app.get('/weather', async (req, res) => {
    const { city } = req.query;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        res.status(500).json({ error: 'Error fetching weather' });
    }
});

const port = 5001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
