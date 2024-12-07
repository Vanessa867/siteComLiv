import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const GerenciarClube = () => {
  const { clubeId } = useParams();
  const [clube, setClube] = useState(null); // Dados do clube
  const [encontro, setEncontro] = useState({ titulo: "", descricao: "", data: "", local: "" });
  const [loading, setLoading] = useState(false);
  const [encontros, setEncontros] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Buscar dados do clube e seus encontros
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Buscar dados do clube
        const clubeResponse = await fetch(
          `https://parseapi.back4app.com/classes/Clubes/${clubeId}`,
          {
            method: "GET",
            headers: {
              "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
              "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
              "Content-Type": "application/json",
            },
          }
        );

        if (clubeResponse.ok) {
          const clubeData = await clubeResponse.json();
          setClube(clubeData);
        } else {
          console.error("Erro ao buscar dados do clube:", await clubeResponse.text());
        }

        // Buscar encontros
        const encontrosResponse = await fetch(
          `https://parseapi.back4app.com/classes/Encontros?where={"clubeId":"${clubeId}"}`,
          {
            method: "GET",
            headers: {
              "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
              "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
              "Content-Type": "application/json",
            },
          }
        );

        if (encontrosResponse.ok) {
          const encontrosData = await encontrosResponse.json();
          setEncontros(encontrosData.results || []);
        } else {
          console.error("Erro ao buscar encontros:", await encontrosResponse.text());
        }
      } catch (err) {
        console.error("Erro na conexão:", err);
        setError("Erro ao carregar os dados do clube.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clubeId]);

  // Manipular inputs do formulário
  const handleChange = (e) => {
    setEncontro({ ...encontro, [e.target.name]: e.target.value });
  };

  // Criar um novo encontro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("https://parseapi.back4app.com/classes/Encontros", {
        method: "POST",
        headers: {
          "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
          "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...encontro,
          clubeId,
        }),
      });

      if (response.ok) {
        const newEncontro = await response.json();
        setEncontros([...encontros, newEncontro]); // Atualiza os encontros
        setEncontro({ titulo: "", descricao: "", data: "", local: "" }); // Reseta o formulário
        setSuccess("Encontro criado com sucesso!");
      } else {
        console.error("Erro no servidor:", await response.text());
        setError("Erro ao criar encontro.");
      }
    } catch (err) {
      console.error("Erro na conexão:", err);
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: "20px" }}>
        {clube && (
          <>
            <Typography variant="h4" align="center" sx={{ marginBottom: "20px" }}>
              {clube.titulo}
            </Typography>
            <Typography variant="body1" align="center" sx={{ marginBottom: "20px" }}>
              {clube.descricao}
            </Typography>
          </>
        )}

        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="h6" align="center">
            Criar Encontro
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Título"
              name="titulo"
              value={encontro.titulo}
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

        <Box>
          <Typography variant="h6" align="center" sx={{ marginBottom: "20px" }}>
            Encontros do Clube
          </Typography>
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
                      <Typography variant="body2">
                        Data: {new Date(encontro.data).toLocaleString()}
                      </Typography>
                      <Typography variant="body2">Local: {encontro.local}</Typography>
                    </CardContent>
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