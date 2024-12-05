import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateClub = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // Para redirecionar após o envio do formulário

  // Função para buscar clubes, exemplo do useEffect para pegar clubes
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("https://parseapi.back4app.com/classes/Clubes", {
          method: "POST",
          headers: {
            "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM", 
            "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ", 
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Clubes:", data); // Exemplo de como exibir os clubes
      } catch (error) {
        console.error("Erro ao buscar clubes:", error);
      }
    };

    fetchClubs();
  }, []); 
  const handleCreateClub = async (e) => {
    e.preventDefault();

    
    if (!title || !description) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

   
    const clubData = {
      title,
      description,
    };

  
    const apiUrl = "https://parseapi.back4app.com/classes/Clubes"; 
    const appId = "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM";
    const restApiKey = "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ"; 

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "X-Parse-Application-Id": appId,
          "X-Parse-REST-API-Key": restApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clubData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Clube criado com sucesso:", data);

        
        navigate("/HomeDepoisDoLogin");
      } else {
        throw new Error("Erro ao criar clube.");
      }
    } catch (error) {
      console.error("Erro ao criar clube:", error);
      alert("Houve um erro ao criar o clube. Tente novamente.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          padding: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "30px", color: "#6A1B9A", fontWeight: "600" }}>
          Criar Novo Clube
        </Typography>

        <form onSubmit={handleCreateClub}>
          <TextField
            label="Título do Clube"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              marginBottom: "20px",
              borderRadius: "8px",
              backgroundColor: "#f3eaf7",
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: "#9A358A", 
                },
              },
            }}
          />
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              marginBottom: "20px",
              borderRadius: "8px",
              backgroundColor: "#f3eaf7",
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: "#9A358A", 
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: "#6A1B9A",
              color: "#ffffff",
              padding: "12px",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "16px",
              '&:hover': {
                backgroundColor: "#9A358A", 
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Criar Clube
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateClub;
