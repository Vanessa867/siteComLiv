import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";

const VerClube = () => {
  const { clubId } = useParams(); // Obtém o `clubId` da URL
  const [club, setClub] = useState(null);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await fetch(`https://parseapi.back4app.com/classes/Clubes/${clubId}`, {
          method: 'GET',
          headers: {
            'X-Parse-Application-Id': 'YOUR_APP_ID', // Substitua pelo seu App ID
            'X-Parse-REST-API-Key': 'YOUR_REST_API_KEY', // Substitua pela sua REST API Key
            'Content-Type': 'application/json',
          }
        });
        if (response.ok) {
          const data = await response.json();
          setClub(data);
        }
      } catch (error) {
        console.error('Erro ao buscar clube:', error);
      }
    };

    fetchClub();
  }, [clubId]); // Recarrega sempre que o `clubId` mudar

  if (!club) return <Typography>Carregando...</Typography>;

  return (
    <DashboardLayout>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5">{club.name}</Typography>
        <Typography variant="body1">{club.description}</Typography>
        <Typography variant="body2" color="textSecondary">
          Início: {club.startDate} | Fim: {club.endDate}
        </Typography>
      </Box>
    </DashboardLayout>
  );
};

export default VerClube;
