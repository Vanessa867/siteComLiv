import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Paper, TextField, Button, Typography, Divider } from '@mui/material';
import logo from "../images/comliv.png";

const Cadastrar = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    if (senha !== repetirSenha) {
      setMensagem('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    const userData = { username: nome, email, password: senha };

    try {
      const response = await fetch("http://localhost:8080/api/ComLiv/users/novoUsuario",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setMensagem('Cadastro realizado com sucesso!');
        setNome('');
        setEmail('');
        setSenha('');
        setRepetirSenha('');
        navigate('/HomeDepoisDoLogin');
      } else {
        setMensagem('Erro no cadastro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Erro ao conectar com o servidor.');
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
      <Grid
        item
        xs={12}
        md={10}
        lg={8}
        container
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          padding: "20px",
        }}
      >
        <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ textAlign: 'center',  }}>
          <img
            src={logo}
            alt="Logo do Site"
            style={{
              height: "350px",
              maxWidth: "100%",}}/>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: 'transparent',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#9A358A",
                textAlign: "center"
              }}
            >
              Bem-vindo ao ComLiv!
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { height: "60px", fontSize: "1rem" },
                }}
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { height: "60px", fontSize: "1rem" },
                }}
              />
              <TextField
                label="Senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { height: "60px", fontSize: "1rem" },
                }}
              />
              <TextField
                label="Repetir senha"
                type="password"
                value={repetirSenha}
                onChange={(e) => setRepetirSenha(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { height: "60px", fontSize: "1rem" },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  height: "60px",
                  fontSize: "1rem",
                  backgroundColor: "#9A358A",
                  "&:hover": {
                    backgroundColor: "#7A2A6E",
                  },
                }}
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>

            {mensagem && (
              <Typography color="error" sx={{ marginTop: "20px" }}>
                {mensagem}
              </Typography>
            )}

          <Typography
            variant="body2"
            sx={{ marginTop: "20px", marginBottom: "10px", textAlign: "center" }}
          >
            Já tem uma conta?{" "}
            <Link
              to="/login"
              style={{
                color: "#9A358A",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Faça login!
            </Link>
          </Typography>

          <Divider sx={{ marginY: "5px", backgroundColor: "#9A358A", opacity: 0.4 }} />

          <Typography
            variant="body2"
            sx={{ marginTop: "5px", textAlign: "center" }}
          >
            Deseja voltar?{" "}
            <Link
              to="/"
              style={{
                color: "#9A358A",
                textDecoration: "none",
                fontWeight: "bold",
                marginTop: "10px",
                display: "inline-block",
              }}
            >
              Clique aqui
            </Link>
          </Typography>

          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cadastrar;
