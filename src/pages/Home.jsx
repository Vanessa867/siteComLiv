
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../Styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Main Section */}
      <Container maxWidth="md" className="main-section">
        <Typography variant="h2" className="clubinar" gutterBottom>
          Descubra o Poder da Leitura em Comunidade!
        </Typography>
        <Typography variant="body1" className="description" paragraph>
          Entre na nossa plataforma e transforme a sua experiência de leitura!
          Aqui, você pode criar e participar de clubes de leitura que conectam
          amantes de livros de todas as idades. Compartilhe suas histórias
          favoritas, troque ideias e descubra novas perspectivas com pessoas
          que também são apaixonadas por literatura.
        </Typography>
        <Button variant="contained" color="secondary" className="botão-club">
          Clubinar
        </Button>
      </Container>

      {/* Footer */}
      <footer>
        <Typography variant="body2" align="center" color="textSecondary">
          © 2024 COMLIV. Todos os direitos reservados.
        </Typography>
      </footer>
    </div>
  );
};

export default Home;
