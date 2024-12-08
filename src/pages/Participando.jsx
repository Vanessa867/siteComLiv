import React from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";
import ClubIcon from "@mui/icons-material/GroupAdd";

const Participando = () => {
  const navigate = useNavigate();

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
      <Box sx={{ alignSelf: "flex-start", marginBottom: "5px" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/HomeDepoisDoLogin")}
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#6A1B9A",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#8E24AA",
            },
          }}
        >
          Voltar
        </Button>
      </Box>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h3"
          sx={{
            marginBottom: "30px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#6A1B9A",
            fontSize: "2.5rem",
          }}
        >
          Clubes que estou participando
        </Typography>
      </motion.div>

      <Divider
        sx={{
          backgroundColor: "#6A1B9A",
          width: "100%",
          maxWidth: "600px",
          marginBottom: "40px",
          height: "2px",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.2rem",
            color: "#6A1B9A",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Descubra novos clubes de leitura ou crie o seu próprio. Compartilhe
          experiências e conecte-se com outros apaixonados por livros!
        </Typography>
      </motion.div>

      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent sx={{ textAlign: "center", padding: "30px" }}>
                <BookIcon
                  sx={{
                    fontSize: "3rem",
                    color: "#6A1B9A",
                    marginBottom: "20px",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#6A1B9A",
                  }}
                >
                  Explore os clubes do ComLiv
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6A1B9A",
                    marginBottom: "20px",
                  }}
                >
                  Encontre comunidades literárias incríveis e participe de
                  discussões legais e envolventes.
                </Typography>
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
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent sx={{ textAlign: "center", padding: "30px" }}>
                <ClubIcon
                  sx={{
                    
                    fontSize: "3rem",
                    color: "#6A1B9A",
                    marginBottom: "20px",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#6A1B9A",
                  }}
                >
                  Deseja criar um clube agora?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6A1B9A",
                    marginBottom: "20px",
                  }}
                >
                  Construa seu próprio espaço para troca de ideias sobre livros
                  com amigos e leitores.
                </Typography>
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
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
      <br />
      <br />
    </Box>
  );
};

export default Participando;
