import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Card, CardContent, CardActions, TextField, CircularProgress, Link } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout"; // Importando o layout do dashboard

const MeusClubes = () => {
  const [email, setEmail] = useState(""); // Estado para o email
  const [clubs, setClubs] = useState([]); // Estado para armazenar os clubes
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erro
  const [validEmail, setValidEmail] = useState(true); // Validação do email

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setValidEmail(/\S+@\S+\.\S+/.test(e.target.value)); // Validação simples de email
  };

  const fetchClubs = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://parseapi.back4app.com/classes/Clubes", {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
          "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        const data = await response.json();
        const userClubs = data.results.filter((club) => club.dono === email); // Filtrando pelos clubes do email
        setClubs(userClubs);
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
      fetchClubs(email); // Chama a função para buscar clubes
    }
  };

  const handleDeleteClube = async (clubId) => {
    if (window.confirm("Tem certeza que deseja excluir este clube?")) {
      try {
        const response = await fetch(`https://parseapi.back4app.com/classes/Clubes/${clubId}`, {
          method: "DELETE",
          headers: {
            "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
            "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
            "Content-Type": "application/json"
          },
        });

        if (response.ok) {
          // Atualiza a lista de clubes removendo o clube excluído
          setClubs(clubs.filter(club => club.objectId !== clubId));
        } else {
          alert("Erro ao excluir o clube.");
        }
      } catch (error) {
        alert("Erro ao conectar com o servidor.");
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

        {/* Adicionando espaço entre o formulário e os clubes */}
        <Box sx={{ marginTop: "30px" }}>
          {loading && <CircularProgress sx={{ display: "block", margin: "40px auto", padding: "20px" }} />}
          {error && <Typography variant="h6" align="center" color="error">{error}</Typography>}

          {!loading && !error && clubs.length > 0 && (
            <Grid container spacing={3}>
              {clubs.map((club) => (
                <Grid item xs={12} sm={6} md={4} key={club.objectId}>
                  <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
                    {/* Card com cor de fundo aleatória */}
                    <Box
                      sx={{
                        height: 140,
                        backgroundColor: generateRandomColor(),
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {club.nome}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {club.descricao || "Sem descrição disponível"}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* Link para a página de gerenciamento do clube */}
                      <Link to={`/GerenciarClube/${club.objectId}`} style={{ textDecoration: "none" }}>
                        <Button variant="contained">Gerenciar</Button>
                      </Link>
                      {/* Botão de exclusão */}
                      <Button variant="contained" color="error" onClick={() => handleDeleteClube(club.objectId)}>
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
