import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom"; // Para acessar o ID do clube na URL
import DashboardLayout from "../components/DashboardLayout";

const GerenciarClube = () => {
  const { clubeId } = useParams(); // Obtendo o ID do clube da URL
  const [encontro, setEncontro] = useState({ titulo: "", descricao: "", data: "", local: "" });
  const [loading, setLoading] = useState(false);
  const [encontros, setEncontros] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEncontros = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://parseapi.back4app.com/classes/Encontros?where={"clubeId":"${clubeId}"}`, {
          method: "GET",
          headers: {
            "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
            "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
            "Content-Type": "application/json"
          },
        });
        if (response.ok) {
          const data = await response.json();
          setEncontros(data.results); // Define os encontros existentes do clube
        } else {
          setError("Erro ao buscar encontros.");
        }
      } catch (error) {
        setError("Erro ao conectar com o servidor.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEncontros();
  }, [clubeId]);

  const handleChange = (e) => {
    setEncontro({ ...encontro, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://parseapi.back4app.com/classes/Encontros", {
        method: "POST",
        headers: {
          "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
          "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo: encontro.titulo,
          descricao: encontro.descricao,
          data: encontro.data,
          local: encontro.local,
          clubeId: clubeId, // Associar o encontro ao clube
        })
      });

      if (response.ok) {
        const newEncontro = await response.json();
        setEncontros([...encontros, newEncontro]); // Adiciona o novo encontro à lista
        setEncontro({ titulo: "", descricao: "", data: "", local: "" }); // Reseta o formulário
      } else {
        setError("Erro ao criar encontro.");
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: "20px" }}>
          Gerenciar Clube
        </Typography>

        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="h6" align="center">Criar Encontro</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nome do Encontro"
              name="Titulo"
              value={encontro.titulo} // Corrigido para 'nome'
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Descrição"
              name="descricao"
              value={encontro.descricao}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Data"
              name="data"
              type="datetime-local"
              value={encontro.data}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              label="Local"
              name="local"
              value={encontro.local}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? "Criando..." : "Criar Encontro"}
            </Button>
          </form>
        </Box>

        {error && <Typography variant="h6" align="center" color="error">{error}</Typography>}

        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h6" align="center">Encontros do Clube</Typography>
          {loading ? (
            <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
          ) : (
            <Grid container spacing={3}>
              {encontros.map((encontro) => (
                <Grid item xs={12} sm={6} md={4} key={encontro.objectId}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{encontro.titulo}</Typography>
                      <Typography variant="body2">Descrição: {encontro.descricao}</Typography>
                      <Typography variant="body2">Data: {new Date(encontro.data).toLocaleString()}</Typography>
                      <Typography variant="body2">Local: {encontro.local}</Typography>
                    </CardContent>
                    <CardActions>
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

export default GerenciarClube;
