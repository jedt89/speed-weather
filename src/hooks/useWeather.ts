import { useState } from 'react'
import { 
  fetchCurrentWeather, 
  fetchForecast,
  fetchWeatherByCoords 
} from '../api/weather'

interface WeatherData {
  current: string // o any
  forecast: string // o any
}

const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getWeather = async (city: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city)
      ])
      
      setWeatherData({ 
        current: {
          ...current,
          name: city.split(',')[0]
        },
        forecast 
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchWeatherByCoords(lat, lon)
      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de geolocalización')
    } finally {
      setLoading(false)
    }
  }

  return { weatherData, loading, error, getWeather, getWeatherByCoords }
}

export default useWeather