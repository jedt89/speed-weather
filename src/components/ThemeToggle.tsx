import styled from 'styled-components';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleContainer onClick={toggleTheme}>
      <ToggleKnob $theme={theme}>
        {theme === 'light' ? <FiMoon size={14} /> : <FiSun size={14} />}
      </ToggleKnob>
      <ToggleTrack>
        <ToggleText>
          {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
        </ToggleText>
      </ToggleTrack>
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const ToggleKnob = styled.div<{ $theme: 'light' | 'dark' }>`
  position: absolute;
  left: ${({ $theme }) => ($theme === 'light' ? '2px' : 'calc(100% - 26px)')};
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition: left 0.3s ease;
  z-index: 2;
`;

const ToggleTrack = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  padding: 6px 12px 6px 32px;
  color: white;
  font-size: 0.875rem;
`;

const ToggleText = styled.span`
  font-weight: 500;
`;

export default ThemeToggle;
