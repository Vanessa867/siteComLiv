import React, { useEffect, useState } from "react";
import { Box, TextField, InputAdornment, Typography, Button, Card, CardContent, CardActions, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DashboardLayout from "../components/DashboardLayout";

const HomeDepoisDoLogin = () => {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    card: {
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
    cardContent: {
      padding: "20px",
    },
    cardActions: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      backgroundColor: "#9A358A",
      color: "white",
      "&:hover": {
        backgroundColor: "#5b1b99",
      },
    },
  };

  // Fetching clubs from API
  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://parseapi.back4app.com/classes/Clubes", {
          method: "GET",
          headers: {
            "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM", 
            "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ", 
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const data = await response.json();
          setClubs(data.results); // Assuming response contains 'results'
        } else {
          setError("Erro ao buscar clubes.");
        }
      } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        setError("Erro ao conectar com o servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  // Filter clubs based on search term
  const filteredClubs = clubs.filter((club) =>
    club.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Adjust if API returns a different key
  );

  return (
    <DashboardLayout>
      <Box sx={{ padding: "20px" }}>
        <Box sx={dynamicStyles.searchBox}>
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
            sx={dynamicStyles.searchTextField}
          />
        </Box>
        <Typography variant="h5" style={{ marginBottom: "20px", textAlign: "center" }}>
          Clubes Disponíveis
        </Typography>

        {/* Display loading or error message */}
        {loading ? (
          <Typography variant="h6" align="center">Carregando clubes...</Typography>
        ) : error ? (
          <Typography variant="h6" align="center" color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredClubs.map((club) => (
              <Grid item xs={12} sm={6} md={4} key={club.objectId}>
                <Card sx={dynamicStyles.card}>
                  <CardContent sx={dynamicStyles.cardContent}>
                    <Typography variant="h6" gutterBottom>
                      {club.nome}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Descrição: {club.descricao || "Sem descrição"}
                    </Typography>
                  </CardContent>
                  <CardActions sx={dynamicStyles.cardActions}>
                    <Button variant="contained" sx={dynamicStyles.button}>
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
