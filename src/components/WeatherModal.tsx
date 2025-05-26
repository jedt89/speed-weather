import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  WiDaySunny,
  WiRain,
  WiSnow,
  WiCloudy,
  WiThunderstorm,
  WiHumidity,
  WiStrongWind,
  WiBarometer
} from 'react-icons/wi';
import { IoClose } from 'react-icons/io5';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import LoadingSpinner from './LoadingSpinner';

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    current: {
      name: string;
      dt: number;
      main: {
        temp: number;
        humidity: number;
        pressure: number;
      };
      weather: Array<{
        main: string;
        description: string;
      }>;
      wind: {
        speed: number;
      };
    };
    forecast: {
      list: ForecastItem[];
    };
  } | null;
  loading: boolean;
}

const WeatherModal = ({
  isOpen,
  onClose,
  data,
  loading
}: WeatherModalProps) => {
  const getWeatherIcon = (weatherType: string, size = 60) => {
    switch (weatherType.toLowerCase()) {
      case 'clear':
        return <WiDaySunny size={size} />;
      case 'rain':
        return <WiRain size={size} />;
      case 'snow':
        return <WiSnow size={size} />;
      case 'thunderstorm':
        return <WiThunderstorm size={size} />;
      case 'clouds':
        return <WiCloudy size={size} />;
      default:
        return <WiDaySunny size={size} />;
    }
  };

  const processForecastData = () => {
    if (!data?.forecast) return [];

    return data.forecast.list
      .filter((_: unknown, index: number) => index % 8 === 0)
      .map((item: ForecastItem) => ({
        date: new Date(item.dt * 1000).toLocaleDateString('es', {
          weekday: 'short'
        }),
        temp: Math.round(item.main.temp),
        humidity: item.main.humidity,
        icon: item.weather[0].main
      }));
  };

  const forecastData = processForecastData();
  const currentDate = data ? new Date(data.current.dt * 1000) : new Date();

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? (
              <LoadingWrapper>
                <LoadingSpinner />
              </LoadingWrapper>
            ) : data ? (
              <>
                <CloseButton onClick={onClose}>
                  <IoClose size={24} />
                </CloseButton>

                <CurrentWeatherSection>
                  <WeatherHeader>
                    <h2>{data.current.name}</h2>
                    <p>
                      {currentDate.toLocaleDateString('es', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })}
                    </p>
                  </WeatherHeader>

                  <WeatherMain>
                    <WeatherIcon>
                      {getWeatherIcon(data.current.weather[0].main, 80)}
                    </WeatherIcon>
                    <Temperature>
                      {Math.round(data.current.main.temp)}°C
                    </Temperature>
                    <WeatherDescription>
                      {data.current.weather[0].description}
                    </WeatherDescription>
                  </WeatherMain>

                  <WeatherDetails>
                    <DetailItem>
                      <WiHumidity size={24} />
                      <span>Humedad</span>
                      <strong>{data.current.main.humidity}%</strong>
                    </DetailItem>
                    <DetailItem>
                      <WiStrongWind size={24} />
                      <span>Viento</span>
                      <strong>{data.current.wind.speed} km/h</strong>
                    </DetailItem>
                    <DetailItem>
                      <WiBarometer size={24} />
                      <span>Presión</span>
                      <strong>{data.current.main.pressure} hPa</strong>
                    </DetailItem>
                  </WeatherDetails>
                </CurrentWeatherSection>

                <ForecastSection>
                  <h3>Pronóstico 5 días</h3>
                  <ChartContainer>
                    <ResponsiveContainer width='100%' height={200}>
                      <LineChart data={forecastData}>
                        <CartesianGrid strokeDasharray='3 3' opacity={0.3} />
                        <XAxis dataKey='date' />
                        <YAxis />
                        <Tooltip
                          formatter={(value: number) => [
                            `${value}°C`,
                            'Temperatura'
                          ]}
                          labelFormatter={(label) => `Día: ${label}`}
                        />
                        <Line
                          type='monotone'
                          dataKey='temp'
                          stroke='#4361ee'
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  <DailyForecast>
                    {forecastData.map((day, index) => (
                      <ForecastDay key={index}>
                        <div>{day.date}</div>
                        <div>{getWeatherIcon(day.icon, 30)}</div>
                        <div>{day.temp}°C</div>
                      </ForecastDay>
                    ))}
                  </DailyForecast>
                </ForecastSection>
              </>
            ) : null}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const CurrentWeatherSection = styled.section`
  text-align: center;
  margin-bottom: 2rem;
`;

const WeatherHeader = styled.div`
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.8rem;
  }

  p {
    margin: 0.3rem 0 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
  }
`;

const WeatherMain = styled.div`
  margin-bottom: 1.5rem;
`;

const WeatherIcon = styled.div`
  margin: 0 auto;
  display: inline-block;
`;

const Temperature = styled.h2`
  font-size: 3.5rem;
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 300;
`;

const WeatherDescription = styled.p`
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0.5rem 0;
  font-size: 1.1rem;
`;

const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  svg {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  strong {
    margin-top: 0.3rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.1rem;
  }
`;

const ForecastSection = styled.section`
  margin-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.background};
  padding-top: 1.5rem;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 200px;
  margin: 1.5rem 0;
`;

const DailyForecast = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ForecastDay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  div:first-child {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  div:nth-child(2) {
    margin-bottom: 0.5rem;
  }

  div:last-child {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default WeatherModal;
