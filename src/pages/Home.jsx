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
import imagens5 from '../images/imagem5.png'


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

       <Container id="como-funciona" maxWidth="lg" className="new-section">
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

      <Container className="benefits-section" maxWidth="md">
      <Typography variant="h4" className="section-title" gutterBottom>
        Benefícios da Leitura
      </Typography>
      <Box className="benefits-list">
        <Box className="benefit-item">
          <Typography variant="h3" className="benefit-number">
            1
          </Typography>
          <Box className="benefit-content">
            <Typography variant="h6" className="benefit-title">
              Desenvolve o Conhecimento e a Criatividade
            </Typography>
            <Typography variant="body2" className="benefit-description">
              A leitura é uma porta de entrada para o conhecimento, oferecendo
              insights sobre temas diversos e ampliando a compreensão do mundo.
            </Typography>
          </Box>
        </Box>

      <Box className="benefit-item">
        <Typography variant="h3" className="benefit-number">
          2
        </Typography>
        <Box className="benefit-content">
          <Typography variant="h6" className="benefit-title">
            Aprimora a Empatia e a Inteligência Emocional
          </Typography>
          <Typography variant="body2" className="benefit-description">
            Ao vivenciar diferentes histórias e perspectivas, os leitores podem
            entender melhor os dilemas e os conflitos alheios, fortalecendo sua
            empatia.
          </Typography>
        </Box>
      </Box>

      <Box className="benefit-item">
        <Typography variant="h3" className="benefit-number">
          3
        </Typography>
        <Box className="benefit-content">
          <Typography variant="h6" className="benefit-title">
            Reduz o Estresse e Melhora o Bem-Estar Mental
          </Typography>
          <Typography variant="body2" className="benefit-description">
            A leitura é uma forma eficaz de relaxamento, ajudando a aliviar o
            estresse e promovendo uma sensação de calma e tranquilidade.
          </Typography>
        </Box>
      </Box>
    </Box>
  </Container>

  <Container className="community-section" maxWidth="lg">
  <Box className="community-content">
    <Box className="community-image">
      <img src={imagens5} alt="Leitura em comunidade" className="image"
      />
    </Box>

    <Box className="community-text">
      <Typography variant="h4" className="community-title" gutterBottom>
        Leitura em comunidade
      </Typography>
      <Typography variant="body1" className="community-description">
        Ler em comunidade ou em clubes permite que os leitores compartilhem suas
        impressões e entendimentos sobre um livro, o que enriquece a experiência
        de leitura. Cada pessoa traz vivências e pontos de vista únicos, o que
        abre portas para interpretações diversas e novas reflexões sobre a obra,
        criando um aprendizado coletivo e único. Essa troca torna a leitura mais
        dinâmica e reveladora, proporcionando uma compreensão mais rica do livro
        e dos temas abordados.
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
