import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';

const Header = () => {
    return (
        <header>
            <h1>ComLiv</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/Sobre">Sobre</Link>
                <Link to="/Planos">Planos</Link>
                <Link to="/Comofunciona">Como Funciona</Link>
            </nav>
            <div>
                <Link to="/Cadastrar" className="registro-link">Cadastrar</Link>
                <button>Entrar</button>
            </div>
        </header>
    );
};

export default Header;

