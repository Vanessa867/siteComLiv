import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../images/comliv.png';
import '@fontsource/nunito';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';

const Header = () => {
  return (
    <AppBar 
    position="fixed" 
    color="default" 
    elevation={0}
    sx={{ backgroundColor: 'white' }}
    >
      <Toolbar>
        <Typography variant="h6" color="secondary" component="div" sx={{ flexGrow: 1 }}>
        <img 
        src= {logo} 
        alt="logotipo do site"
        style={{ height: '85px', maxWidth: '100px', objectFit: 'contain' }} 
        />
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Button component={Link} to="/" sx={{ color: '#350052', fontWeight: '700', fontFamily: 'Nunito' }}>Início</Button>
          <Button component={Link} to="/sobre" sx={{ color: '#350052', fontWeight: '700', fontFamily: 'Nunito' }}>Sobre</Button>
          <Button 
          href="#como-funciona" 
          sx={{ color: '#350052', fontWeight: '700', fontFamily: 'Nunito' }}>
          Como Funciona
          </Button>

        </Box>
        <Button component={Link} to="/cadastrar" sx={{ color: '#350052', fontFamily: 'Nunito, Arial, sans-serif', fontWeight: 700 }}>Cadastrar</Button>
        <Button component={Link} to="/Login" variant="contained" color="primary">Entrar</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
