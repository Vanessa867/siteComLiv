import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Card, CardContent, CardActions, TextField, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom"; // Importando Link para navegação
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

  return (
    <DashboardLayout>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: "20px", color: "#9A358A" }}>
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

        {loading && <CircularProgress sx={{ display: "block", margin: "40px auto", padding: "20px" }} />}
        {error && <Typography variant="h6" align="center" color="error">{error}</Typography>}

        {!loading && !error && clubs.length > 0 && (
          <Grid container spacing={3}>
            {clubs.map((club) => (
              <Grid item xs={12} sm={6} md={4} key={club.objectId}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{club.nome}</Typography>
                    <Typography variant="body2">Descrição: {club.descricao || "Sem descrição"}</Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/GerenciarClube/${club.objectId}`} style={{ textDecoration: "none" }}>
                      <Button variant="contained">Gerenciar</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default MeusClubes;
