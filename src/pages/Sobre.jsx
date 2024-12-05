import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';


import sobreImagem from '../images/amigos.png'; 
import visaoImagem from '../images/visao.png'; 
import tecnologiaImagem from '../images/pcz.png'; 

const Sobre = () => {
  return (
    <Box sx={{ padding: '40px', backgroundColor: '#FFFFF' }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ color: '#6A1B9A', marginBottom: '20px', fontWeight: 'bold' }}>
            Sobre Nós
          </Typography>
          <Typography variant="body1" sx={{ color: '#333', lineHeight: 1.6 }}>
            Somos uma equipe apaixonada por leitura, comprometida em facilitar o acesso a clubes de leitura e promover o incentivo à leitura em todo o Brasil. Nossa missão é tornar a leitura mais acessível, proporcionando espaços onde leitores de todas as idades e interesses possam se reunir, compartilhar experiências e se inspirar mutuamente. Acreditamos que a leitura transforma vidas, e queremos fazer parte dessa jornada com você. Essa é a essência do nosso clube: simplicidade e acessibilidade. Garantimos que nossos conteúdos e plataformas sejam fáceis de entender, acolhendo leitores de diferentes gerações, para que todos possam se sentir à vontade em cada página virada.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <img 
            src={sobreImagem} 
            alt="Imagem sobre nós" 
            style={{ width: '50%', borderRadius: '8px', display: 'block', margin: '0 auto' }} 
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12}>
        </Grid>

        <Grid item xs={12} md={6}>
          <img 
            src={visaoImagem} 
            alt="Imagem Nossa Visão" 
            style={{ width: '50%', height: 'auto', borderRadius: '8px', display: 'block' }} 
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ color: '#333', lineHeight: 1.6 }}>
          <Typography variant="h4" sx={{ color: '#6A1B9A', marginBottom: '20px', fontWeight: 'bold' }}>
            Nossa Visão
          </Typography>
            Nossa visão é transformar o aprendizado e a colaboração, utilizando as tecnologias mais inovadoras para criar soluções que atendem às necessidades dos usuários de forma simples e eficaz. Acreditamos que a tecnologia deve ser acessível e intuitiva, oferecendo ferramentas que promovam a conectividade e o crescimento contínuo.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12}>
      
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ color: '#333', lineHeight: 1.6 }}>
          <Typography variant="h4" sx={{ color: '#6A1B9A', marginBottom: '20px', fontWeight: 'bold' }}>
            Como Funciona Nossa Tecnologia
          </Typography>
            A escolha de nossas tecnologias é feita com base na eficiência, escalabilidade e experiência do usuário. Buscamos sempre adotar ferramentas que atendam aos requisitos do projeto e que nos permitam entregar resultados de alta qualidade de forma rápida e eficiente. 
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <img 
            src={tecnologiaImagem} 
            alt="Imagem Como Funciona Nossa Tecnologia" 
            style={{ width: '50%', height: 'auto', borderRadius: '8px', display: 'block' }} 
          />
        </Grid>
      </Grid>

      <Box sx={{ marginBottom: '40px' }} />

      <Typography variant="h4" sx={{ color: '#6A1B9A', marginBottom: '40px', fontWeight: 'bold' }}>
        Nossas Tecnologias
      </Typography>
      <Grid container spacing={4}>
        {[ 
          { name: 'React', description: 'Biblioteca JavaScript para a criação de interfaces de usuário.' },
          { name: 'Vite', description: 'Ferramenta para construção de aplicações com um ambiente de desenvolvimento otimizado.' },
          { name: 'CSS', description: 'Usado para o design e estilo da aplicação, proporcionando uma interface limpa e intuitiva.' },
          { name: 'Vercel', description: 'Plataforma de hospedagem do site, garantindo desempenho e escalabilidade.' },
          { name: 'Spring Boot', description: 'Framework Java para construção de aplicações backend robustas e escaláveis.' },
          { name: 'Javascript', description: 'Linguagem de programação amplamente utilizada para o desenvolvimento de aplicações.' }
        ].map((tech, index) => (
          <Grid item xs={8} md={4} key={index}>
            <Paper 
              sx={{ 
                padding: '20px', 
                backgroundColor: '#fff', 
                boxShadow: 3, 
                borderRadius: '8px', 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-10px)', 
                  boxShadow: 6 
                }
              }}
            >
              <Typography variant="h5" sx={{ color: '#6A1B9A', fontWeight: 'bold' }}>
                {tech.name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#333', lineHeight: 1.6 }}>
                {tech.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Sobre;
