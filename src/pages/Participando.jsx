import React, { useState } from "react"; 
import { Box, Typography, Card, CardContent, CardActions, Button } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const Participando = () => {
  const [participatingClubs, setParticipatingClubs] = useState(
    JSON.parse(localStorage.getItem("participatingClubs")) || [] // Supondo que você salva a lista no localStorage
  );
  const navigate = useNavigate();

  const dynamicStyles = {
    card: {
      marginBottom: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    cardContent: {
      padding: "20px",
    },
    cardActions: {
      justifyContent: "flex-end",
    },
    link: {
      color: "#9A358A",
      textDecoration: "none",
      fontSize: "14px",
    },
  };

  // Função para redirecionar para a página do clube
  const handleViewClub = (clubId) => {
    navigate(`/ver-clube/${clubId}`); // Redireciona para a página do clube, usando o `objectId`
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5" style={{ marginBottom: "20px", textAlign: "center" }}>
          Clubes Participando
        </Typography>

        {participatingClubs.length > 0 ? (
          participatingClubs.map((club) => (
            <Card key={club.objectId} sx={dynamicStyles.card}>
              <CardContent sx={dynamicStyles.cardContent}>
                <Typography variant="h6" component="h2">
                  {club.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {club.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                  Início: {club.startDate} | Fim: {club.endDate}
                </Typography>
              </CardContent>
              <CardActions sx={dynamicStyles.cardActions}>
                <Button 
                  size="small" 
                  color="primary" 
                  onClick={() => handleViewClub(club.objectId)} // Chama a função de redirecionamento
                >
                  Ver Clube
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="body1" style={{ textAlign: "center", marginTop: "20px" }}>
            Você não está participando de nenhum clube ainda.
          </Typography>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default Participando;
