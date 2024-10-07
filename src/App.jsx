import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Planos from './pages/Planos';
import Sobre from './pages/Sobre';
import ComoFunciona from './pages/ComoFunciona';
import Header from './components/header';
import Cadastrar from './pages/Cadastrar';


function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/comofunciona" element={<ComoFunciona />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
      </Routes>
    </Router>
  );
}

export default App
