import React from "react";
import { Box, Typography, TextField } from '@mui/material';
import DashboardLayout from '../components/DashboardLayout'; // Importa o layout do dashboard

const HomeDepoisDoLogin = () => {
  const userSession = JSON.parse(localStorage.getItem('userSession'));
  const userName = userSession ? userSession.userName : '';

  const dynamicStyles = {
    welcomeMessage: {
      color: "#7d29d9",
      fontSize: "28px",
      marginBottom: "20px",
    },
    searchBox: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f3eaf7",
      borderRadius: "25px",
      padding: "5px 15px",
      margin: "20px 0",
    },
    searchTextField: {
      paddingLeft: "10px",
      fontSize: "14px",
      width: "100%", // Garantindo que a barra de busca ocupe todo o espaço
    },
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: '20px' }}>
        {/* Mensagem de boas-vindas */}
        <Typography sx={dynamicStyles.welcomeMessage}>
          Oiiee, {userName}
        </Typography>
        <Typography variant="body1">
          Bem-vindo(a) ao ComLiv, qual o clube de hoje?
        </Typography>

        {/* Barra de busca */}
        <Box sx={dynamicStyles.searchBox}>
          <TextField
            fullWidth
            placeholder="Buscar livros, clubes e usuários"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            sx={dynamicStyles.searchTextField}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default HomeDepoisDoLogin;
