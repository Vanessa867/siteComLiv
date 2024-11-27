import React from "react";
import '../Styles/HomeDepoisDoLogin.css';

const HomeDepoisDoLogin = () => {
  const userSession = JSON.parse(localStorage.getItem('userSession'));
const userName = userSession ? userSession.userName : '';

  return (
      <div className="home-container">
          <header>
              <h1>Oiiee, {userName}</h1>
              <p>Bem-vindo ao ComLiv, qual clube de hoje?</p>
              </header>
            <div className="favorites-section">
                <h2>Favoritos dos ComLiveiros</h2>
                <div className="favorites-list">
                    <div className="card">
                        <img src="link-da-imagem-1" alt="Descrição 1" />
                        <p>Rumo às épocas com jiu-jitsu</p>
                        <button>Participar</button>
                    </div>
                    <div className="card">
                        <img src="link-da-imagem-2" alt="Descrição 2" />
                        <p>E assim que acaba, Começando clubes...</p>
                        <button>Participar</button>
                    </div>
                    <div className="card">
                        <img src="link-da-imagem-3" alt="Descrição 3" />
                        <p>O poder do hábito com disciplina</p>
                        <button>Participar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeDepoisDoLogin;
