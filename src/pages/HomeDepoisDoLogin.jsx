import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DashboardLayout from "../components/DashboardLayout";

// Função para gerar cor hexadecimal aleatória
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const HomeDepoisDoLogin = () => {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingClubs, setLoadingClubs] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar clubes
  useEffect(() => {
    const fetchClubs = async () => {
      setLoadingClubs(true);
      try {
        const response = await fetch("http://localhost:8080/api/ComLiv/Clubs/buscarclub", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar clubes.");
        }

        const data = await response.json();
        console.log("Clubes:", data); // Para verificar o retorno da API
        setClubs(data.clubs || data); // Ajuste dependendo do formato retornado
      } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        setError("Erro ao conectar com o servidor.");
      } finally {
        setLoadingClubs(false);
      }
    };

    fetchClubs();
  }, []);

  const filteredClubs = clubs.filter((club) =>
    club.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Box sx={{ padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f3eaf7",
            borderRadius: "8px",
            padding: "5px 15px",
            marginBottom: "20px",
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <TextField
            fullWidth
            placeholder="Buscar clubes"
            variant="standard"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9A358A" }} />
                </InputAdornment>
              ),
              sx: { padding: "8px 0" },
            }}
          />
        </Box>
        <Typography variant="h5" style={{ marginBottom: "20px", textAlign: "center" }}>
          Clubes Disponíveis
        </Typography>

        {loadingClubs ? (
          <Typography variant="h6" align="center">
            Carregando clubes...
          </Typography>
        ) : error ? (
          <Typography variant="h6" align="center" color="error">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredClubs.map((club) => (
              <Grid item xs={12} sm={6} md={4} key={club.id || club.name}>
                <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
                  <Box
                    sx={{
                      height: 140,
                      backgroundColor: generateRandomColor(),
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {club.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {club.description || "Sem descrição disponível"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" sx={{ backgroundColor: "#9A358A" }}>
                      Participar
                    </Button>
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

export default HomeDepoisDoLogin;
