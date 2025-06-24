import { ThemeProvider } from './context/ThemeContext';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeView from './views/HomeView';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <ThemeProvider>
      {({ themeStyles }) => (
        <StyledProvider theme={themeStyles}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomeView />} />
            </Routes>
          </BrowserRouter>
        </StyledProvider>
      )}
    </ThemeProvider>
  );
};

export default App;
