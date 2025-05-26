import { useState, useEffect } from 'react'

interface Location {
  latitude: number | null
  longitude: number | null
}

const useGeolocation = () => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalización no soportada en tu navegador')
      setIsLoading(false)
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setIsLoading(false)
      },
      (err) => {
        setError(err.message)
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return { location, error, isLoading }
}

export default useGeolocation