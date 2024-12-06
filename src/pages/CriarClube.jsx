import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography } from '@mui/material'; // Importando os componentes do MUI
import DashboardLayout from '../components/DashboardLayout'; // Importando o DashboardLayout
import '../Styles/CriarClube.css'; // Estilos

// Definindo as credenciais do Back4App
const BACK4APP_URL = 'https://parseapi.back4app.com/classes/Clubes'; 
const HEADERS = {
  "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM", 
  "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ", 
  "Content-Type": "application/json"
};

const CriarClube = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [emailDono, setEmailDono] = useState(""); // Novo estado para o email do dono
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate(); // Hook de navegação para redirecionar após criação

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica do email
    if (!emailDono || !/\S+@\S+\.\S+/.test(emailDono)) {
      setMensagem("Por favor, insira um email válido para o dono.");
      return;
    }

    const data = {
      nome: nome,
      descricao: descricao,
      dono: emailDono // Usando o email do dono inserido pelo usuário
    };

    try {
      const response = await fetch(BACK4APP_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar o clube.");
      }

      const result = await response.json();
      if (result.objectId) {
        setMensagem("Clube criado com sucesso!");
        setNome("");  // Limpar os campos após criação
        setDescricao(""); // Limpar a descrição após criação
        setEmailDono(""); // Limpar o campo de email após criação
        // Redireciona para a página de home após a criação do clube
        setTimeout(() => {
          navigate("/HomeDepoisDoLogin"); // Substitua pelo caminho correto da sua home
        }, 2000);
      } else {
        setMensagem("Erro ao criar o clube.");
      }
    } catch (error) {
      console.error("Erro ao criar o clube:", error);
      setMensagem("Erro ao criar o clube. Tente novamente.");
    }
  };

  return (
    <DashboardLayout>
      <div className="form-container">
        <Paper elevation={3} style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', marginTop: '20px' }}>
          <button onClick={() => navigate('/HomeDepoisDoLogin')} className="back-button" style={{ marginBottom: '20px' }}>
            &#8592; Voltar
          </button>

          <Typography variant="h4" align="center" gutterBottom>
            Criar Clube
          </Typography>

          {mensagem && <p>{mensagem}</p>}

          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Nome do Clube"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div>
              <TextField
                label="Descrição"
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div>
              <TextField
                label="Email do Dono"
                type="email"
                value={emailDono}
                onChange={(e) => setEmailDono(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              style={{ marginTop: '20px', height: '40px', fontSize: '0.875rem' }}
            >
              Criar Clube
            </Button>
          </form>
        </Paper>
      </div>
    </DashboardLayout>
  );
};

export default CriarClube;
