import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    const userData = { email: email, password: senha };

    try {
      const response = await fetch('https://parseapi.back4app.com/login', {
        method: 'POST',
        headers: {
          'X-Parse-Application-Id': '17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM',
          'X-Parse-REST-API-Key': '2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ',
          'X-Parse-Revocable-Session': '1',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setMensagem('Login realizado com sucesso!');
        // Aqui você pode redirecionar o usuário ou fazer outra ação
      } else {
        setMensagem('Erro no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <Grid container style={{ height: '100vh' }}>
        {/* Texto à esquerda */}
        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Paper style={{ padding: '100px', textAlign: 'center', backgroundColor: '#9A358A', height: '80%' }}>
            <Typography variant="h4" style={{ color: '#ffffff' }} gutterBottom>
              Bem-vindo ao ComLiv, faça seu login!
            </Typography>
          </Paper>
        </Grid>

        {/* Formulário à direita */}
        <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paper style={{ padding: '100px', textAlign: 'center', backgroundColor: '#ffffff', height: '80%' }}>
            <Typography variant="h5" style={{ color: '#9A358A' }} gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputProps={{
                  sx: { height: '60px', fontSize: '1rem' } 
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
                  sx: { height: '60px', fontSize: '1rem' } 
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ height: '60px', fontSize: '1rem' }} 
                disabled={loading}
              >
                {loading ? 'Logando...' : 'Login'}
              </Button>
            </form>
            {mensagem && <Typography color="error">{mensagem}</Typography>}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
