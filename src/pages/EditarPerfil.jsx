import React, { useEffect, useState } from 'react';
import { Avatar, TextField, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';
import NavigationButtons from '../components/NavigationButtons';

const EditarPerfil = () => {
  const [formData, setFormData] = useState({ nome: '', email: '', foto: '' });
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

        setFormData({
          nome: currentUser.get('username') || '',
          email: currentUser.get('email') || '',
          foto: currentUser.get('foto') || '',
        });
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        alert('Erro ao carregar os dados para edição.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        alert('Você precisa estar autenticado.');
        navigate('/login');
        return;
      }

      currentUser.set('username', formData.nome);
      currentUser.set('email', formData.email);
      currentUser.set('foto', formData.foto);

      await currentUser.save();
      alert('Dados atualizados com sucesso!');
      navigate('/perfil');
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      alert('Erro ao salvar as alterações. Tente novamente.');
    }
  };

  if (loading) return <Typography>Carregando...</Typography>;

  return (
    <Grid container style={{ height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Paper style={{ padding: '50px', textAlign: 'center', backgroundColor: '#ffffff' }}>
      <NavigationButtons />
        <Avatar
          src={formData.foto || ''}
          alt="Foto do usuário"
          sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: '20px' }}
        />
        <TextField
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL da Foto"
          name="foto"
          value={formData.foto}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginTop: '20px' }}
        >
          Salvar Alterações
        </Button>
      </Paper>
    </Grid>
  );
};

export default EditarPerfil;