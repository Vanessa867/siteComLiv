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
import CreateClub from './components/CreateClub';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';
import Participando from './pages/Participando';
import '../src/App.css';



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
  const location = useLocation(); 

  const handleLogin = () => {
    console.log('Usuário logado com sucesso!');
  };
  
  return (
    <>
       {/* O Header será exibido em todas as rotas, exceto em cadastrar e login */}
       {location.pathname !== '/cadastrar' && location.pathname !== '/Login' && location.pathname !== '/Perfil' && location.pathname !== '/HomeDepoisDoLogin' && location.pathname !== '/Config' && <Header />}
      
      
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
        <Route path="/Perfil" element={<Perfil />} /> 
       <Route path="/EditarPerfil" element={<EditarPerfil />} />
       <Route path="/Participando" element={<Participando />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app-container"> {/* Certifique-se de que o container tenha 100% de altura */}
          <AppContent />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;