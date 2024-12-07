import React, { useState } from "react";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../images/comliv.png";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    const userData = { email, password: senha };

    try {
      const response = await fetch("https://parseapi.back4app.com/login", {
        method: "POST",
        headers: {
          "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM",
          "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ",
          "X-Parse-Revocable-Session": "1",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Login realizado com sucesso!");
        localStorage.setItem("userSession", JSON.stringify(data));
        onLogin();
        navigate("/HomeDepoisDoLogin");
      } else {
        setMensagem("Erro no login. Verifique suas credenciais.");
      }
    } catch (error) {
      setMensagem(`Erro ao conectar com o servidor: ${error.message || "Desconhecido"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        backgroundColor: "#F4F6F8",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "40px",
          maxWidth: "800px",
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            marginRight: "50px"}}>
              
          <img
            src={logo}
            alt="Logo do Site"
            style={{
              height: "350px",
              maxWidth: "100%",
            }}
          />
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#9A358A",
            }}
          >
            Bem-vindo de volta!
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(0, 0, 0, 0.6)", marginBottom: "30px" }}
          >
            Por favor, entre na sua conta para continuar.
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                height: "50px",
                backgroundColor: "#9A358A",
                "&:hover": {
                  backgroundColor: "#7A2A6E",
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
            </Button>
          </form>

          {mensagem && (
            <Typography color="error" sx={{ marginTop: "20px" }}>
              {mensagem}
            </Typography>
          )}

        <Typography
          variant="body2"
          sx={{ marginTop: "20px", marginBottom:"5px", textAlign: "center" }}>
          Não tem uma conta?{" "}
          <Link
            to="/cadastrar"
            style={{
              color: "#9A358A",
              textDecoration: "none",
              fontWeight: "bold",
            }}>
            Cadastre-se
          </Link>
        </Typography>

        <Divider
        sx={{
          marginY: "5px", 
          width: "100%", 
          height: "1px", 
          backgroundColor: "#9A358A", 
          opacity: 0.4, 
        }}/>

        <Typography
          variant="body2"
          sx={{ marginTop: "5px", textAlign: "center" }} >
          Deseja voltar?{" "}
          <Link
            to="/"
            style={{
              color: "#9A358A",
              textDecoration: "none",
              fontWeight: "bold",
            }} >
            Clique aqui
          </Link>
        </Typography>

        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
