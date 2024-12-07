import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Grid, Card, CardContent, CardActions, Modal, Fade, Backdrop, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const GerenciarClube = () => {
  const { clubId } = useParams(); // Pega o ID do clube da URL
  const [club, setClub] = useState(null);
  const [encontros, setEncontros] = useState([]); // Estado para armazenar os encontros
  const [newEncontro, setNewEncontro] = useState({ nome: "", data: "", hora: "" }); // Formulário para novo encontro
  const [openModal, setOpenModal] = useState(false);
  const [selectedEncontro, setSelectedEncontro] = useState(null);

  const navigate = useNavigate();

  // Fetch clube e encontros
  useEffect(() => {
    const fetchClube = async () => {
      try {
        const response = await fetch(`https://parseapi.back4app.com/classes/Clubes/${clubId}`, {
          method: "GET",
          headers: {
            "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
            "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setClub(data);
          setEncontros(data.encontros || []); // Assume que encontros estão no campo 'encontros'
        } else {
          alert("Erro ao carregar o clube.");
        }
      } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro ao conectar com o servidor.");
      }
    };

    fetchClube();
  }, [clubId]);

  // Função para adicionar novo encontro
  const handleAddEncontro = async (e) => {
    e.preventDefault();
    const newEncontroData = { ...newEncontro, clubeId: clubId };
    try {
      const response = await fetch("https://parseapi.back4app.com/classes/Encontros", {
        method: "POST",
        headers: {
          "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
          "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEncontroData),
      });

      if (response.ok) {
        const data = await response.json();
        setEncontros([...encontros, data]); // Adiciona o novo encontro na lista
        setNewEncontro({ nome: "", data: "", hora: "" }); // Reseta o formulário
      } else {
        alert("Erro ao adicionar encontro.");
      }
    } catch (error) {
      console.error("Erro ao adicionar encontro:", error);
      alert("Erro ao adicionar encontro.");
    }
  };

  // Função para abrir o modal de detalhes do encontro
  const handleOpenModal = (encontro) => {
    setSelectedEncontro(encontro);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEncontro(null);
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: "20px" }}>
          Gerenciar Clube: {club?.nome}
        </Typography>

        <form onSubmit={handleAddEncontro}>
          <Box sx={{ marginBottom: "20px" }}>
            <TextField
              label="Nome do Encontro"
              fullWidth
              value={newEncontro.nome}
              onChange={(e) => setNewEncontro({ ...newEncontro, nome: e.target.value })}
              required
            />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <TextField
              label="Data"
              type="date"
              fullWidth
              value={newEncontro.data}
              onChange={(e) => setNewEncontro({ ...newEncontro, data: e.target.value })}
              required
            />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <TextField
              label="Hora"
              type="time"
              fullWidth
              value={newEncontro.hora}
              onChange={(e) => setNewEncontro({ ...newEncontro, hora: e.target.value })}
              required
            />
          </Box>
          <Button variant="contained" color="primary" type="submit">
            Adicionar Encontro
          </Button>
        </form>

        <Grid container spacing={3} sx={{ marginTop: "30px" }}>
          {encontros.map((encontro) => (
            <Grid item xs={12} sm={6} md={4} key={encontro.objectId}>
              <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {encontro.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Data: {encontro.data} | Hora: {encontro.hora}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" onClick={() => handleOpenModal(encontro)}>
                    Detalhes
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modal de detalhes do encontro */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Detalhes do Encontro: {selectedEncontro?.nome}
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Data" secondary={selectedEncontro?.data} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Hora" secondary={selectedEncontro?.hora} />
                </ListItem>
              </List>
              <Button onClick={handleCloseModal} variant="contained" color="secondary" sx={{ marginTop: "16px" }}>
                Fechar
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </DashboardLayout>
  );
};

export default GerenciarClube;
