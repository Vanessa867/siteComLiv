import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="fixed" color="default" elevation={2}>
      <Toolbar>
        <Typography variant="h6" color="secondary" component="div" sx={{ flexGrow: 1 }}>
          ComLiv
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/sobre" color="inherit">Sobre</Button>
          <Button component={Link} to="/planos" color="inherit">Planos</Button>
          <Button component={Link} to="/comofunciona" color="inherit">Como Funciona</Button>
        </Box>
        <Button component={Link} to="/cadastrar" color="secondary">Cadastrar</Button>
        <Button component={Link} to="/entrar" variant="contained" color="primary">Entrar</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
