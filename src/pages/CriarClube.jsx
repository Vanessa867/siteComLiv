import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography } from '@mui/material'; // Importando os componentes do MUI
import DashboardLayout from '../components/DashboardLayout'; // Importando o DashboardLayout
import '../Styles/CriarClube.css'; // Estilos
import { Description } from '@mui/icons-material';


const BACKEND_URL = 'http://localhost:8080/api/ComLiv/Clubs'; 
const HEADERS = {
  "Content-Type": "application/json"
};


const CriarClube = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [email, setEmail] = useState(""); // Novo estado para o email do dono
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate(); // Hook de navegação para redirecionar após criação

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validação básica do email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMensagem("Por favor, insira um email válido para o dono.");
      return;
    }
  
    const data = {
      name: nome,
      description: descricao,
      email: email // Altere o campo conforme sua API
    };
  
    try {
      const response = await fetch(`${BACKEND_URL}/criarNovoclub`, { 
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao criar o clube.");
      }
  
      const result = await response.json();
      if (result) {
        setMensagem("Clube criado com sucesso!");
        setNome("");  
        setDescricao(""); 
        setEmail(""); 

        // Redireciona para a página de home após a criação do clube
        setTimeout(() => {
          navigate("/HomeDepoisDoLogin"); 
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
