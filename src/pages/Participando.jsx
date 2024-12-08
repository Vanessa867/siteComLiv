import { useEffect, useState } from "react";
import { Box, Typography, Divider, Button, Paper, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Participando = () => {
  const navigate = useNavigate();
  const [clubesParticipando, setClubesParticipando] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubesParticipando = async () => {
      // Recuperando o token de sessão armazenado
      const token = localStorage.getItem("sessionToken");

      if (!token) {
        console.error("Usuário não autenticado. Faça login primeiro.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://parseapi.back4app.com/classes/_User/me", {
          method: "GET",
          headers: {
            "X-Parse-Application-Id": "YOUR_APP_ID", // Substitua com seu App ID
            "X-Parse-REST-API-Key": "YOUR_API_KEY", // Substitua com sua API Key
            "X-Parse-Session-Token": token, // Enviando o token de sessão nas requisições
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log("Dados do usuário:", userData);

          // Expandindo a relação 'clubesparticipando'
          const clubesIds = userData.clubesparticipando ? userData.clubesparticipando.map((relation) => relation.objectId) : [];
          setClubesParticipando(clubesIds);
        } else {
          console.error("Erro ao buscar dados do usuário:", response.status);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubesParticipando();
  }, []); // O efeito roda uma vez ao carregar o componente

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F3E5F5",
        minHeight: "100vh",
        padding: "20px",
        color: "#6A1B9A",
      }}
    >
      {/* Botão de navegação no topo dentro do fluxo */}
      <Box sx={{ alignSelf: "flex-start", marginBottom: "50px" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/HomeDepoisDoLogin")}
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#6A1B9A",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#8E24AA",
            },
          }}
        >
          VOLTAR
        </Button>
      </Box>

      {/* Título da Página */}
      <Typography
        variant="h4"
        sx={{
          marginBottom: "20px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Clubes que estou participando
      </Typography>

      <Divider
        sx={{
          backgroundColor: "#6A1B9A",
          width: "100%",
          maxWidth: "600px",
          marginBottom: "30px",
        }}
      />

      {/* Conteúdo Principal */}
      {loading ? (
        <CircularProgress sx={{ color: "#6A1B9A" }} />
      ) : clubesParticipando.length > 0 ? (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            padding: "30px",
            maxWidth: "600px",
            textAlign: "center",
            color: "#6A1B9A",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "18px",
              marginBottom: "15px",
            }}
          >
            Aqui estão os clubes que você está participando:
          </Typography>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {clubesParticipando.map((clubeId) => (
              <li key={clubeId} style={{ marginBottom: "10px" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Clube ID: {clubeId}
                </Typography>
              </li>
            ))}
          </ul>
        </Paper>
      ) : (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            padding: "30px",
            maxWidth: "600px",
            textAlign: "center",
            color: "#6A1B9A",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "18px",
              marginBottom: "15px",
            }}
          >
            Ainda não há clubes na sua lista.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "18px",
            }}
          >
            Participe de um agora ou crie seu primeiro clube!
          </Typography>

          {/* Botões */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px", // Espaçamento entre os botões
              marginTop: "20px",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/HomeDepoisDoLogin")}
              sx={{
                borderColor: "#6A1B9A",
                color: "#6A1B9A",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#F3E5F5",
                  borderColor: "#8E24AA",
                },
              }}
            >
              Explorar Clubes
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/CriarClube")}
              sx={{
                borderColor: "#6A1B9A",
                color: "#6A1B9A",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#F3E5F5",
                  borderColor: "#8E24AA",
                },
              }}
            >
              Criar Clube
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Participando;
