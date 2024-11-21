import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../Styles/Home.css';
import livro from '../images/Books.png';
import imagens1 from '../images/imgDois.2container.png';
import imagens2 from '../images/imgTres.2container.png';
import imagens3 from '../images/imgUm.2container.png'


const Home = () => {
  return (
    <div className="home">
      <Container 
      maxWidth="md" 
      className="main-section"
      >
        <Box className="content-container">
          <Box className="text-content">
            <Typography variant="h2" className="clubinar" gutterBottom>
              Descubra o Poder 
              da Leitura em Comunidade!
            </Typography>
            <Typography variant="body1" className="description" paragraph>
              Entre no ComLiv e transforme sua experiência de leitura! Aqui, você pode criar e participar de clubes 
              que conectam amantes de livros de todas as idades. Compartilhe suas histórias favoritas, troque ideias e descubra novas perspectivas com pessoas que também são apaixonadas pela literatura. Venha fazer parte dessa comunidade literária vibrante!
            </Typography>
            <Button variant="contained" color="secondary" className="botão-club">
              Clubinar
            </Button>
          </Box>
          <img src={livro} alt="Livros" className="imagem-livro" />
        </Box>
      </Container>

       <Container maxWidth="lg" className="new-section">
        <Typography variant="h3" className="new-section-title" gutterBottom>
         Participando de um clube
        </Typography>
        <Typography variant="body1" className="new-section-description" paragraph>
        Aqui, você pode se juntar a grupos que discutem desde os livros que<br></br>
        você ama até aqueles que provocam debates acalorados.
        </Typography>
        <Box className="image-grid">
          <Box className="image-card">
            <img src={imagens3} alt="Funcionalidade 1" className="feature-image" />
            <Typography variant="h5" className="image-title">Como funciona?</Typography>
            <Typography variant="body2" className="image-description">
            Descubra como se conectar com outros leitores e participar de discussões envolventes. No ComLiv, você encontra clubes online!
            </Typography>
          </Box>
          <Box className="image-card">
            <img src={imagens1} alt="Funcionalidade 2" className="feature-image" />
            <Typography variant="h5" className="image-title">Posso criar meu próprio clube?</Typography>
            <Typography variant="body2" className="image-description">
            Sim! Aprenda a montar um clube personalizado e reunir amigos para explorar novas histórias.
            </Typography>
          </Box>
          <Box className="image-card">
            <img src={imagens2} alt="Funcionalidade 3" className="feature-image" />
            <Typography variant="h5" className="image-title">Quais gêneros?</Typography>
            <Typography variant="body2" className="image-description">
            Explore uma variedade de gêneros, desde clássicos até os mais contemporâneos, e encontre o clube perfeito para você!
            </Typography>
          </Box>
        </Box>
      </Container>

      <footer>
        <Typography variant="body2" align="center" color="textSecondary">
          © 2024 COMLIV. Todos os direitos reservados.
        </Typography>
      </footer>
    </div>
  );
};

export default Home;
