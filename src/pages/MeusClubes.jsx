import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Card, CardContent, CardActions, TextField, CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "../components/DashboardLayout"; // Importando o layout do dashboard

const MeusClubes = () => {
  const [email, setEmail] = useState(""); // Estado para o email
  const [clubs, setClubs] = useState([]); // Estado para armazenar os clubes
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erro
  const [validEmail, setValidEmail] = useState(true); // Validação do email
  const [filteredClubs, setFilteredClubs] = useState([]); // Estado para armazenar os clubes filtrados
  const navigate = useNavigate(); // Hook do react-router-dom para navegação

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setValidEmail(/\S+@\S+\.\S+/.test(e.target.value)); // Validação simples de email
  };

  const fetchClubs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/ComLiv/Clubs/buscarclub", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClubs(data); // Armazena os clubes recebidos da API

        // Filtra os clubes com base no email, se o email for fornecido
        if (email) {
          const filtered = data.filter((club) => club.email === email); // Filtra os clubes pelo email
          setFilteredClubs(filtered); // Armazena os clubes filtrados
        } else {
          setFilteredClubs(data); // Caso não haja email, mostra todos os clubes
        }
      } else {
        setError("Erro ao buscar clubes.");
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (validEmail) {
      fetchClubs(); // Chama a função para buscar clubes
    }
  };

  const handleNavigateToEncontros = (clubId) => {
    navigate(`/Encontros/${clubId}`); // Navega para a página de gerenciamento do clube
  };

  // Função para excluir o clube
  const handleDeleteClube = async (clubId) => {
    if (window.confirm("Tem certeza que deseja excluir este clube?")) {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:8080/api/ComLiv/Clubs/deletar/${clubId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if (response.ok) {
          // Atualiza a lista de clubes removendo o clube excluído
          setFilteredClubs(filteredClubs.filter(club => club.id !== clubId)); 
          setClubs(clubs.filter(club => club.id !== clubId)); // Atualiza a lista completa
        } else {
          alert("Erro ao excluir o clube.");
        }
      } catch (error) {
        alert("Erro ao conectar com o servidor.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: "20px" }}>
          Meus Clubes
        </Typography>

        <form onSubmit={handleEmailSubmit}>
          <TextField
            label="Digite seu Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
            error={!validEmail}
            helperText={!validEmail ? "Por favor, insira um email válido." : ""}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={!validEmail || loading}>
            Buscar Clubes
          </Button>
        </form>

        <Box sx={{ marginTop: "30px" }}>
          {loading && <CircularProgress sx={{ display: "block", margin: "40px auto", padding: "20px" }} />}
          {error && <Typography variant="h6" align="center" color="error">{error}</Typography>}

          {!loading && !error && filteredClubs.length > 0 && (
            <Grid container spacing={3}>
              {filteredClubs.map((club) => (
                <Grid item xs={12} sm={6} md={4} key={club.id}>
                  <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
                    <Box
                      sx={{
                        height: 140,
                        backgroundColor: generateRandomColor(),
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {club.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {club.description || "Sem descrição disponível"}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" onClick={() => handleNavigateToEncontros(club.id)}>
                        Gerenciar
                      </Button>
                      {/* Botão de exclusão */}
                      <Button variant="contained" color="error" onClick={() => handleDeleteClube(club.id)}>
                        Apagar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default MeusClubes;

// Função para gerar cor hexadecimal aleatória
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
