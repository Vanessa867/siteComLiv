import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      {}
      <div className="logo">
      <img src="/src/imagens/comliv.png" alt="comliv.png" />
      </div>

      {/* Main Buttons */}
      <button className="sidebar-button">Criar Clube</button>
      <button className="sidebar-button">Home</button>
      <button className="sidebar-button">Explorar</button>

      {/* Clubes Section */}
      <div className="sidebar-section">
        <h3>Clubes</h3>
        <button className="sidebar-button">Favoritos</button>
        <button className="sidebar-button">Participando</button>
        <button className="sidebar-button">Meus Clubes</button>
      </div>

      {/* Usuários Section */}
      <div className="sidebar-section">
        <h3>Usuários</h3>
        <button className="sidebar-button">Perfil</button>
        <button className="sidebar-button">PremiumLiv</button>
        <button className="sidebar-button">Configurações</button>
        <button className="sidebar-button">Sair</button>
      </div>
    </div>
  );
}

export default Sidebar;