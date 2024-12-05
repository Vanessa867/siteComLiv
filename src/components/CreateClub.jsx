import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@mui/material';
import NavigationButtons from '../components/NavigationButtons';


const CreateClub = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClub = { name, description, startDate, endDate };

    try {
      const response = await fetch('http://localhost:8080/api/clubs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClub),
      });

      if (response.ok) {
        setMessage('Clube criado com sucesso!');
        navigate('/'); // Redireciona para a Home após criar o clube
      } else {
        setMessage('Erro ao criar o clube. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <Paper style={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>
        Criar Clube
      </Typography>
      <NavigationButtons />
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome do Clube"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Data de Início"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Data de Fim"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          Criar Clube
        </Button>
      </form>
      {message && <Typography style={{ marginTop: '20px', color: 'red' }}>{message}</Typography>}
    </Paper>
  );
};

export default CreateClub;
