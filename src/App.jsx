import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import ComoFunciona from './pages/ComoFunciona';
import Header from './components/header';
import Cadastrar from './pages/Cadastrar';
import Login from './pages/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import card from './components/cardClub';
import HomeDepoisDoLogin from './pages/HomeDepoisDoLogin';
import Config from './pages/Config';
import createclub from './components/CreateClub';
import CreateClub from './components/CreateClub';



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

  const handleLogin = () => {
    console.log('Usuário logado com sucesso!');
  };
  
  return (
    <>
       {/* O Header será exibido em todas as rotas, exceto em cadastrar e login */}
       {location.pathname !== '/cadastrar' && location.pathname !== '/Login' && location.pathname !== '/HomeDepoisDoLogin' && location.pathname !== '/Config' && <Header />}
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/comofunciona" element={<ComoFunciona />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/Login" element={<Login onLogin={handleLogin} />} />
        <Route path="/card" element={<card />} />
        <Route path="/HomeDepoisDoLogin" element={<HomeDepoisDoLogin />} /> 
        <Route path="/CreateClub" element={<CreateClub />}/>
        <Route path="/Config" element={<Config />} />
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