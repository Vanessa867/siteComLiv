import React, { useEffect, useState } from "react";
import { Box, TextField, InputAdornment, Typography, List, ListItem, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DashboardLayout from "../components/DashboardLayout";

const HomeDepoisDoLogin = () => {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dynamicStyles = {
    searchBox: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f3eaf7",
      borderRadius: "8px",
      padding: "5px 15px",
      marginBottom: "20px",
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
    },
    searchTextField: {
      fontSize: "14px",
      width: "100%",
    },
  };

  // Buscar clubes da API
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/ComLiv/Clubs");
        if (response.ok) {
          const data = await response.json();
          setClubs(data);
        } else {
          console.error("Erro ao buscar clubes.");
        }
      } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
      }
    };

    fetchClubs();
  }, []);

  // Filtrar clubes com base na busca
  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Box sx={{ padding: "20px" }}>
        <Box sx={dynamicStyles.searchBox}>
          <TextField
            fullWidth
            placeholder="Buscar livros, clubes e usuários"
            variant="standard"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#7d29d9" }} />
                </InputAdornment>
              ),
              sx: { padding: "8px 0" },
            }}
            sx={dynamicStyles.searchTextField}
          />
        </Box>
        <Typography variant="h5" style={{ marginBottom: "20px", textAlign: "center" }}>
          Clubes Disponíveis
        </Typography>
        <List>
          {filteredClubs.map((club) => (
            <ListItem key={club.id} sx={{ borderBottom: "1px solid #ccc" }}>
              <ListItemText
                primary={club.name}
                secondary={`Descrição: ${club.description} | Início: ${club.startDate} | Fim: ${club.endDate}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </DashboardLayout>
  );
};

export default HomeDepoisDoLogin;
