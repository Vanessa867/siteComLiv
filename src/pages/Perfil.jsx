import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';
import NavigationButtons from '../components/NavigationButtons';

const Perfil = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = Parse.User.current();
        if (!currentUser) {
          alert('Você precisa estar autenticado.');
          navigate('/login');
          return;
        }

        const nome = currentUser.get('username') || 'Nome não definido';
        const email = currentUser.get('email') || 'Email não definido';
        const foto = currentUser.get('foto');

        setUserData({ nome, email, foto });
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        alert('Erro ao carregar os dados do perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) return <Typography>Carregando...</Typography>;

  return (
    <Grid container style={{ height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Paper style={{ padding: '50px', textAlign: 'center', backgroundColor: '#ffffff' }}>
      <NavigationButtons />
        <Avatar
          src={userData.foto || ''}
          alt="Foto do usuário"
          sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: '20px' }}
        />
        <Typography variant="h5" gutterBottom>{userData.nome}</Typography>
        <Typography variant="body1" gutterBottom>{userData.email}</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/editarperfil')}>
          Editar Perfil
        </Button>
      </Paper>
    </Grid>
  );
};

export default Perfil;
