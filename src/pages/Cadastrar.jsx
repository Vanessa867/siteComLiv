import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';
import NavigationButtons from '../components/NavigationButtons';

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

    const userData = { username: nome, email: email, password: senha };

    try {
      const response = await fetch('https://parseapi.back4app.com/users', {
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
    <div className='container'>
      <Grid container style={{ height: '100vh' }}>
        <Grid item xs={2} sm={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Paper style={{ padding: '100px', textAlign: 'center', backgroundColor: '#9A358A', height: '80%' }}>
            <Typography variant="h4" style={{ color: '#ffffff' }} gutterBottom>
              Bem-vindo ao ComLiv, crie sua conta!
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paper style={{ padding: '100px', textAlign: 'center', backgroundColor: '#ffffff', height: '80%' }}>
          <NavigationButtons />  
            <Typography variant="h5" style={{ color: '#9A358A' }} gutterBottom>
              Cadastre-se!
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
                  sx: { height: '60px', fontSize: '1rem' },
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
                  sx: { height: '60px', fontSize: '1rem' },
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
                  sx: { height: '60px', fontSize: '1rem' },
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
                  sx: { height: '60px', fontSize: '1rem' },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ height: '60px', width: '600px', fontSize: '1rem' }}
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </form>
            {mensagem && <Typography color="error">{mensagem}</Typography>}
            
            <Typography variant="body2" style={{ marginTop: '20px' }}>
              Já tem uma conta? <Link to="/login" style={{ color: '#9A358A', textDecoration: 'none' }}>Faça login!</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cadastrar;