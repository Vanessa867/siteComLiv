import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Planos from './pages/Planos';
import Sobre from './pages/Sobre';
import ComoFunciona from './pages/ComoFunciona';
import Header from './components/header';
import Cadastrar from './pages/Cadastrar';
import Login from './pages/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9A358A',
    },
    secondary: {
      main: '#d900ff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// Componente que renderiza o Header condicionalmente
const AppContent = () => {
  const location = useLocation(); // Obtém a localização atual

  return (
    <>
       {/* O Header será exibido em todas as rotas, exceto em cadastrar e login */}
       {location.pathname !== '/cadastrar' && location.pathname !== '/Login' && <Header />}
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/comofunciona" element={<ComoFunciona />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent /> {/* Usa o componente que renderiza o Header condicionalmente */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
