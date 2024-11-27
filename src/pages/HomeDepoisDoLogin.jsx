import React from "react";
import '../Styles/HomeDepoisDoLogin.css';
import { Box, Grid, Paper, Button, Typography, TextField } from '@mui/material';

const HomeDepoisDoLogin = () => {
  const userSession = JSON.parse(localStorage.getItem('userSession'));
const userName = userSession ? userSession.userName : '';

const dynamicStyles = {
  welcomeMessage: {
    color: "#7d29d9",
    fontSize: "24px",
    marginBottom: "20px",
  },
  cardButton: {
    marginTop: "10px",
    backgroundColor: "#7d29d9",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#6822ba",
    },
  },
};

// Lista de clubes favoritos
const favoriteClubs = [
  {
    id: 1,
    img: "link-da-imagem-1",
    title: "Rumo às épocas com jiu-jitsu",
  },
  {
    id: 2,
    img: "link-da-imagem-2",
    title: "E assim que acaba, Começando clubes...",
  },
  {
    id: 3,
    img: "link-da-imagem-3",
    title: "O poder do hábito com disciplina",
  },
];

return (
  <Box className="home-container" sx={{ padding: "20px" }}>
    {/* Cabeçalho */}
    <header>
      <Typography sx={dynamicStyles.welcomeMessage}>
        Oiiee, {userName}
      </Typography>
      <Typography variant="body1">
        Bem-vindo ao ComLiv, qual clube de hoje?
      </Typography>
    </header>

    {/* Barra de pesquisa */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f3eaf7",
        borderRadius: "25px",
        padding: "5px 15px",
        margin: "20px 0",
      }}
    >
      <TextField
        fullWidth
        placeholder="Buscar livros, clubes e usuários"
        variant="standard"
        InputProps={{ disableUnderline: true }}
        sx={{ paddingLeft: "10px", fontSize: "14px" }}
      />
    </Box>

    {/* Seção de Favoritos */}
    <section className="favorites-section">
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Favoritos dos ComLiveiros
      </Typography>
      <Grid container spacing={3}>
        {favoriteClubs.map((club) => (
          <Grid item xs={12} sm={6} md={4} key={club.id}>
            <Paper
              className="card"
              sx={{
                padding: "15px",
                textAlign: "center",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
              }}
            >
              <img
                src={club.img}
                alt={`Imagem do clube ${club.title}`}
                style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
              />
              <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                {club.title}
              </Typography>
              <Button sx={dynamicStyles.cardButton}>Participar</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </section>
  </Box>
);
};

export default HomeDepoisDoLogin;

