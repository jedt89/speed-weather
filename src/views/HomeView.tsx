import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useWeather from '../hooks/useWeather';
import useGeolocation from '../hooks/useGeolocation';
import CityCard from '../components/CityCard';
import WeatherModal from '../components/WeatherModal';
import ThemeToggle from '../components/ThemeToggle';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import {
  WiDaySunny,
  WiRain,
  WiSnow,
  WiCloudy,
  WiThunderstorm
} from 'react-icons/wi';

import { chile, continentalCities } from '../constants/cities'; 

const HomeView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [filteredCities, setFilteredCities] = useState<Record<string, string[]>>({});
  const { weatherData, loading, error, getWeather, getWeatherByCoords } = useWeather();
  const { location, error: geoError } = useGeolocation();

  const getWeatherIcon = (weatherType: string) => {
    const size = 24;
    switch (weatherType.toLowerCase()) {
      case 'clear': return <WiDaySunny size={size} />;
      case 'rain': return <WiRain size={size} />;
      case 'snow': return <WiSnow size={size} />;
      case 'thunderstorm': return <WiThunderstorm size={size} />;
      case 'clouds': return <WiCloudy size={size} />;
      default: return <WiDaySunny size={size} />;
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude && !selectedCity) {
      getWeatherByCoords(location.latitude, location.longitude);
    }
  }, [location]);

  useEffect(() => {
    const allCities: Record<string, string[]> = {
      'Chile': chile,
      'América': continentalCities.america,
      'Europa': continentalCities.europe,
      'Asia': continentalCities.asia,
      'África y Oceanía': continentalCities.africa_oceania,
    };

    if (searchQuery.trim() === '') {
      setFilteredCities(allCities);
    } else {
      const filtered: Record<string, string[]> = {};
      for (const section in allCities) {
        filtered[section] = allCities[section].filter((city) =>
          city.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFilteredCities(filtered);
    }
  }, [searchQuery]);

  const handleCityClick = async (city: string) => {
    setSelectedCity(city);
    await getWeather(city);
  };

  return (
    <Container>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Clima Global</Title>
        <ThemeToggle />
      </Header>

      <SearchContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <SearchInputContainer>
          <FiSearch color="#666" />
          <SearchInput
            type="text"
            placeholder="Buscar ciudad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchInputContainer>
      </SearchContainer>

      {geoError && (
        <GeoError>
          <FiMapPin /> No pudimos obtener tu ubicación: {geoError}
        </GeoError>
      )}

      {loading && !weatherData && <LoadingSpinner />}

      {error && (
        <ErrorDisplay
          message={error}
          onRetry={() => selectedCity && handleCityClick(selectedCity)}
        />
      )}

      {Object.entries(filteredCities).map(([continent, cities]) =>
        cities.length > 0 ? (
          <Section key={continent}>
            <SectionTitle>{continent}</SectionTitle>
            <CitiesGrid>
              {cities.map((city, index) => (
                <motion.div
                  key={city}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CityCard
                    city={city.split(',')[0]}
                    country={city.split(',')[1].trim()}
                    onClick={() => handleCityClick(city)}
                    icon={getWeatherIcon('clear')}
                  />
                </motion.div>
              ))}
            </CitiesGrid>
          </Section>
        ) : null
      )}

      <WeatherModal
        isOpen={!!selectedCity}
        onClose={() => setSelectedCity(null)}
        data={weatherData}
        loading={loading}
      />
    </Container>
  );
};

// Estilos
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  transition: background 0.3s ease;
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

const SearchContainer = styled(motion.div)`
  margin-bottom: 2rem;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  margin-left: 0.8rem;
  outline: none;
  padding: 0.2rem 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.8;
  }
`;

const GeoError = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background: rgba(255, 152, 0, 0.1);
  color: #ff9800;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.4rem;
  font-weight: 500;
`;

const CitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export default HomeView;
