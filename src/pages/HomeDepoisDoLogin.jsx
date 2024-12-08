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
  Link,
  Button,
  Modal,
  Fade,
  Backdrop,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubEncontros, setClubEncontros] = useState([]); // Para armazenar os encontros do clube

  const navigate = useNavigate();

  // Função para buscar clubes
  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://parseapi.back4app.com/classes/Clubes", {
          method: "GET",
          headers: {
            "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
            "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setClubs(data.results);
        } else {
          setError("Erro ao buscar clubes.");
        }
      } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        setError("Erro ao conectar com o servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  // Função para buscar os encontros de um clube
  const fetchEncontros = async (clubId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://parseapi.back4app.com/classes/Encontros?where={"clubId":{"__type":"Pointer","className":"Clubes","objectId":"${clubId}"}}`, {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
          "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClubEncontros(data.results);
      } else {
        setError("Erro ao buscar encontros.");
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor.");
      console.error("Erro de conexão:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClubs = clubs.filter((club) =>
    club.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = async (club) => {
    setSelectedClub(club); // Armazenar os dados do clube selecionado
    setOpenModal(true); // Abrir o modal

    // Buscar os encontros do clube
    await fetchEncontros(club.objectId);
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Fechar o modal
    setSelectedClub(null); // Limpar os dados do clube
    setClubEncontros([]); // Limpar os encontros
  };

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

        {loading ? (
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
              <Grid item xs={12} sm={6} md={4} key={club.objectId}>
                <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
                  {/* Substituindo CardMedia por uma cor de fundo aleatória */}
                  <Box
                    sx={{
                      height: 140,
                      backgroundColor: generateRandomColor(),
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {club.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {club.descricao || "Sem descrição disponível"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Button size="small" variant="contained" sx={{ backgroundColor: "#9A358A" }}>
  Participar
</Button>
                    <Link
                      href="#"
                      onClick={() => handleOpenModal(club)}
                      underline="hover"
                      color="primary"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      Ver Encontros
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Modal para exibir detalhes dos encontros */}
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
                Encontros do Clube: {selectedClub?.nome}
              </Typography>
              {/* Aqui você pode exibir os encontros */}
              {loading ? (
                <Typography variant="body2" align="center">
                  Carregando encontros...
                </Typography>
              ) : clubEncontros.length === 0 ? (
                <Typography variant="body2" color="error" align="center">
                  Nenhum encontro encontrado.
                </Typography>
              ) : (
                <List>
                  {clubEncontros.map((encontro, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={encontro.nome}
                        secondary={`Titulo: ${encontro.titulo || "titulo não disponível"} - Local: ${encontro.local || "Local não disponível"} - Data: ${encontro.data || "data não disponível"} - Descricao: ${encontro.descricao || "Descrição não disponível"}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
              <Button onClick={handleCloseModal} sx={{ marginTop: "20px" }} variant="contained">
                Fechar
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </DashboardLayout>
  );
};

export default HomeDepoisDoLogin;
