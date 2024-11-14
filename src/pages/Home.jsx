
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../Styles/Home.css';
import livro from '../images/Books.png';

const Home = () => {
  return (
    <div className="home">
      {/* Main Section */}
      <Container maxWidth="md" className="main-section">
        <Typography variant="h2" className="clubinar" gutterBottom>
          Descubra o Poder da Leitura em Comunidade!
        </Typography>
        <Typography variant="body1" className="description" paragraph>
        Entre no ComLiv e transforme sua experiência de leitura! Aqui, você pode criar e participar de clubes 
        que conectam amantes de livros de todas as idades. Compartilhe suas histórias favoritas, troque ideias e descubra novas perspectivas com pessoas que também são apaixonadas pela literatura. Venha fazer parte dessa comunidade literária vibrante!
        </Typography>
        <Button variant="contained" color="secondary" className="botão-club">
          Clubinar
        </Button>
      </Container>
      <img src={livro} alt="" />

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
