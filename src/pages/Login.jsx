import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await Parse.User.logIn(username, password);
      console.log("Usuário logado:", user);

      // O token de sessão é obtido após o login bem-sucedido
      const sessionToken = user.getSessionToken();
      console.log("Token de Sessão:", sessionToken);

      // Armazenando o token no localStorage para usá-lo em outras requisições
      localStorage.setItem("sessionToken", sessionToken);

      // Redireciona o usuário para a página de clubes
      navigate('/HomeDepoisDoLogin');
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Nome de usuário"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Senha"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={login}
        sx={{ marginTop: '20px' }}
      >
        Entrar
      </Button>
    </div>
  );
};

export default Login;
