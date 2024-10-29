import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, useScrollTrigger } from '@mui/material';
import { Link } from "react-router-dom";
import logocomliv from '../assets/logocomliv.png'; 

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}

ElevationScroll.propTypes = {
  children: PropTypes.element,
  window: PropTypes.func,
};

const Header = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
      <AppBar position="fixed" color="default" elevation={0} sx={{border: 'none', backgroundColor: 'transparent', zIndex: (theme) => theme.zIndex.drawer + 9999}}>
      <Toolbar>
       
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img 
            src={logocomliv} 
            alt="Logotipo ComLiv" 
            style={{ height: '40px', marginRight: '16px' }} 
          />
        </Link>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' ,padding: 3}}>
          <Button component={Link} to="/sobre" color="primary" sx={{ textTransform: 'none', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', fontSize: '16px',  padding: '0 26px' }}>Sobre</Button>
          <Button component={Link} to="/planos" color="primary" sx={{ textTransform: 'none', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', fontSize: '16px',  padding: '0 26px'}}>Planos</Button>
          <Button component={Link} to="/comofunciona" color="primary" sx={{ textTransform: 'none', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', fontSize: '16px',  padding: '0 26px' }}>Como Funciona</Button>
        </Box>
        
        <Button component={Link} to="/cadastrar" color="secondary" sx={{ textTransform: 'none', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold',fontSize: '16px' }}>Cadastrar</Button>
        <Button component={Link} to="/entrar" variant="contained" color="primary" sx={{ textTransform: 'none', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', height: '40px', padding: '0 26px',fontSize: '16px' }}>Entrar</Button>

      </Toolbar>
    </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Box sx={{ paddingTop: '70px' }}>
        <Typography variant="body1">
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default Header;
