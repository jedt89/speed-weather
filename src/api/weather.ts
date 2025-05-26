import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
    lang: 'es'
  }
});

export const fetchCurrentWeather = async (city: string) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: { q: city }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el clima actual');
  }
};

export const fetchForecast = async (city: string) => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        q: city,
        cnt: 40
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el pronóstico');
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  try {
    const [current, forecast] = await Promise.all([
      weatherApi.get('/weather', { params: { lat, lon } }),
      weatherApi.get('/forecast', { params: { lat, lon, cnt: 40 } })
    ]);
    return { current: current.data, forecast: forecast.data };
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener datos por ubicación');
  }
};
