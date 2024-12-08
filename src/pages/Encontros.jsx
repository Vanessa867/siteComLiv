import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Card, CardContent, TextField, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout"; // Importando o layout do dashboard

const Encontros = () => {
  const { clubId } = useParams(); // Pegando o ID do clube da URL
  const [encontros, setEncontros] = useState([]); // Estado para os encontros
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erro
  const [newEncontro, setNewEncontro] = useState({ titulo: "", local: "", data: "", descricao: "" }); // Dados do novo encontro
  const [creating, setCreating] = useState(false); // Estado de carregamento ao criar um novo encontro
  const [showForm, setShowForm] = useState(false); // Controle do formulário

  // Função para buscar os encontros do clube
  const fetchEncontros = async () => {
    setLoading(true);
    setError(null);
  
    try {
      console.log("buscando encontros para clubId:", clubId); // Verificando o clubId
  
      const response = await fetch(`https://parseapi.back4app.com/classes/Encontros?where={"clubId":{"__type":"Pointer","className":"Clubes","objectId":"${clubId}"}}`, {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
          "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
          "Content-Type": "application/json"
        },
      });
  
      console.log("Resposta da API:", response.status); // Verificando o status da resposta
  
      if (response.ok) {
        const data = await response.json();
        console.log("Data recebida:", data); // Verifique a estrutura da resposta
  
        if (data.results && data.results.length > 0) {
          setEncontros(data.results); // Atualiza o estado com os encontros
        } else {
          setError("Nenhum encontro encontrado.");
        }
      } else {
        setError("Erro ao buscar encontros.");
        console.log("Erro na resposta da API:", response.status); // Verifique o código de status da resposta
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor.");
      console.log("Erro de conexão:", error); // Verifique o erro no console
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    console.log("clubId:", clubId); // Verifique o valor de clubId
    fetchEncontros();
  }, [clubId]);
  

  // Função para criar novo encontro
  const handleCreateEncontro = async (e) => {
    e.preventDefault();

    const { titulo, local, data, descricao } = newEncontro;
    if (!titulo || !local || !data || !descricao) {
      alert("Preencha todos os campos.");
      return;
    }

    setCreating(true);
    try {
      const response = await fetch("https://parseapi.back4app.com/classes/Encontros", {
        method: "POST",
        headers: {
          "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
          "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          local,
          descricao,
          data: {
            __type: "Date",
            iso: new Date(data).toISOString(),
          },
          clubId: {
            __type: "Pointer",
            className: "Clubes",
            objectId: clubId,
          },
        }),
      });

      if (response.ok) {
        setNewEncontro({ titulo: "", local: "", data: "", descricao: "" });
        setShowForm(false);
        fetchEncontros();
      } else {
        alert("Erro ao criar o encontro.");
      }
    } catch {
      alert("Erro ao conectar com o servidor.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: "20px" }}>
          Encontros do Clube
        </Typography>

        {/* Formulário para criar um novo encontro */}
        {showForm ? (
          <Box sx={{ marginBottom: "30px" }}>
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Criar Novo Encontro
            </Typography>
            <form onSubmit={handleCreateEncontro}>
              <TextField
                label="Título"
                fullWidth
                margin="normal"
                value={newEncontro.titulo}
                onChange={(e) => setNewEncontro({ ...newEncontro, titulo: e.target.value })}
                required
              />
              <TextField
                label="Local"
                fullWidth
                margin="normal"
                value={newEncontro.local}
                onChange={(e) => setNewEncontro({ ...newEncontro, local: e.target.value })}
                required
              />
              <TextField
                label="Data"
                type="date"
                fullWidth
                margin="normal"
                value={newEncontro.data}
                onChange={(e) => setNewEncontro({ ...newEncontro, data: e.target.value })}
                required
              />
              <TextField
                label="Descrição"
                fullWidth
                margin="normal"
                value={newEncontro.descricao}
                onChange={(e) => setNewEncontro({ ...newEncontro, descricao: e.target.value })}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={creating}>
                {creating ? "Criando..." : "Criar Encontro"}
              </Button>
            </form>
          </Box>
        ) : (
          <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
            Novo Encontro
          </Button>
        )}

        {/* Lista de encontros */}
        <Box sx={{ marginTop: "30px" }}>
          {loading && <CircularProgress sx={{ display: "block", margin: "40px auto" }} />}
          {error && <Typography variant="h6" align="center" color="error">{error}</Typography>}
          {!loading && !error && encontros.length > 0 && (
            <Grid container spacing={3}>
              {encontros.map((encontro) => (
                <Grid item xs={12} sm={6} md={4} key={encontro.objectId}>
                  <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6">
                        {encontro.titulo}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {encontro.descricao || "Sem descrição disponível"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Data: {new Date(encontro.data.iso).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Local: {encontro.local || "Local não especificado"}
                      </Typography>
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

export default Encontros;
