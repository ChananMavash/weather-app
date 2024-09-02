const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { error: null, weatherData: null });
});

app.get('/weather', async (req, res) => {
  const { location } = req.query;
  if (!location) {
    return res.render('index', { error: 'Please enter a city or country name', weatherData: null });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    res.render('index', { weatherData, error: null });
  } catch (error) {
    console.error(error);
    res.render('index', { error: 'Could not retrieve weather data. Please check your input and try again.', weatherData: null });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
