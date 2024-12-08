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
    //função para adicionar ...
    const handleParticipar = async (clubId) => {
      const token = localStorage.getItem("sessionToken");
    
      if (!token) {
        alert("Usuário não autenticado. Faça login primeiro.");
        return;
      }
    
      try {
        // Primeiro, obtenha os dados atuais do usuário
        const userResponse = await fetch("https://parseapi.back4app.com/classes/_User/me", {
          method: "GET",
          headers: {
            "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
            "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
            "X-Parse-Session-Token": token,
          },
        });
    
        if (!userResponse.ok) {
          console.error("Erro ao buscar dados do usuário:", userResponse.status);
          return;
        }
    
        const userData = await userResponse.json();
        const clubesAtuais = userData.clubesparticipando || []; // Use os clubes atuais ou um array vazio
    
        // Adicione o novo clube ao array, se ainda não estiver nele
        if (!clubesAtuais.includes(clubId)) {
          clubesAtuais.push(clubId);
    
          // Atualize o array no Back4App
          const response = await fetch("https://parseapi.back4app.com/classes/_User/me", {
            method: "PUT",
            headers: {
              "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
              "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
              "X-Parse-Session-Token": token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ clubesparticipando: clubesAtuais }), // Atualize o campo
          });
    
          if (response.ok) {
            alert("Você agora está participando do clube!");
          } else {
            console.error("Erro ao atualizar clubes:", response.status);
          }
        } else {
          alert("Você já está participando desse clube!");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro ao tentar participar do clube. Tente novamente mais tarde.");
      }
    };

    
    
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
        {/* ...resto do código */}
        <Grid container spacing={3}>
          {filteredClubs.map((club) => (
            <Grid item xs={12} sm={6} md={4} key={club.objectId}>
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
                    {club.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {club.descricao || "Sem descrição disponível"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ backgroundColor: "#9A358A" }}
                    onClick={() => handleParticipar(club.objectId)}
                  >
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
        {/* Modal de encontros */}
        {/* ...resto do código */}
      </Box>
    </DashboardLayout>
  );
};

export default HomeDepoisDoLogin;

