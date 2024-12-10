import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography } from '@mui/material'; 
import DashboardLayout from '../components/DashboardLayout'; 
import '../Styles/Perfil.css';


const BACK4APP_URL = 'https://parseapi.back4app.com/classes/Perfil'; 
const HEADERS = {
  "X-Parse-Application-Id": "17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM", 
  "X-Parse-REST-API-Key": "2WBj1Fla9r4jFGw9V0XSfq2h4xvw8AbTwr20bpJQ", 
  "Content-Type": "application/json"
};

const EditarLogin = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [telefone, setTelefone] = useState('');
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [userId, setUserId] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
   
    axios
      .get(`${BACK4APP_URL}?limit=1`, { headers: HEADERS })
      .then((response) => {
        if (response.data.results.length > 0) {
          const user = response.data.results[0];
          setEmail(user.email);
          setName(user.name);
          setTelefone(user.telefone);
          setUserId(user.objectId); // Armazena o objectId do perfil
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar dados do perfil:', err);
        setError('Houve um erro ao tentar carregar os dados.');
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      name: name,
      telefone: telefone,
    };

    if (userId) {
      // Se houver um userId, usamos PUT para atualizar os dados
      axios
        .put(`${BACK4APP_URL}/${userId}`, userData, { headers: HEADERS })
        .then((response) => {
          console.log('Usuário atualizado:', response.data);
          alert('Dados atualizados com sucesso!');
          setIsEditing(false); // Desabilita o modo de edição após salvar
        })
        .catch((err) => {
          console.error('Erro ao enviar dados:', err);
          setError('Houve um erro ao tentar atualizar seus dados. Tente novamente.');
        });
    }
  };

  return (
    <DashboardLayout>
      <div className="form-container">
        {/* Todo conteúdo dentro do Paper */}
        <Paper elevation={3} style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', marginTop: '20px' }}>
          {/* Seta de voltar */}
          <button onClick={() => navigate('/HomeDepoisDoLogin')} className="back-button" style={{ marginBottom: '20px' }}>
            &#8592; Voltar
          </button>

          <Typography variant="h4" align="center" gutterBottom>
            {isEditing ? 'Editar Perfil' : 'Perfil'}
          </Typography>

          {error && <p className="error">{error}</p>}

          {/* Formulário de edição, visível apenas quando isEditing for true */}
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  label="Nome"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
              </div>
              <div>
                <TextField
                  label="Telefone"
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
              </div>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
                style={{ marginTop: '20px', height: '40px', fontSize: '0.875rem' }} // Diminuindo a altura e ajustando a fonte
              >
                Salvar alterações
              </Button>
            </form>
          ) : (
            <div>
              <p><strong>Nome:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Telefone:</strong> {telefone}</p>
            </div>
          )}

          {/* Botão para alternar entre editar e visualizar */}
          {!isEditing && (
            <Button 
              onClick={() => setIsEditing(true)} 
              variant="outlined" 
              color="secondary" 
              fullWidth 
              style={{ marginTop: '20px', height: '40px', fontSize: '0.875rem' }} // Diminuindo a altura e ajustando a fonte
            >
              Editar Perfil
            </Button>
          )}
        </Paper>
      </div>
    </DashboardLayout>
  );
};

export default EditarLogin;
