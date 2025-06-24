import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';

interface CityCardProps {
  city: string;
  country: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const CityCard = ({ city, country, onClick, icon }: CityCardProps) => {
  return (
    <CardContainer
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <IconContainer>{icon}</IconContainer>
      <TextContainer>
        <CityName>{city}</CityName>
        <CountryName>{country}</CountryName>
      </TextContainer>
      <FiMapPin className='pin-icon' />
    </CardContainer>
  );
};

const CardContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  min-height: 90px;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }

  .pin-icon {
    position: absolute;
    right: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.7;
  }
`;

const IconContainer = styled.div`
  margin-right: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CityName = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
`;

const CountryName = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-top: 0.2rem;
`;

export default CityCard;
