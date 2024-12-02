import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import "../Styles/Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
          <Box className="footer-container">
            <Typography variant="body1" className="footer-title">
              Todo Comliveiro é ativo nas redes sociais:
            </Typography>
            <Box className="footer-icons">
              <Link href="https://facebook.com" target="_blank" rel="noopener" className="footer-icon">
                <Facebook />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener" className="footer-icon">
                <Instagram />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener" className="footer-icon">
                <Twitter />
              </Link>
            </Box>
            <Typography variant="body2" className="footer-text">
              © 2024 COMLIV. Todos os direitos reservados.
            </Typography>
            <Typography variant="body2" className="footer-links">
              <Link href="/termos" className="footer-link">Termos de Uso</Link> |{' '}
              <Link href="/privacidade" className="footer-link">Política de Privacidade</Link>
            </Typography>
          </Box>
        </footer>
  );
};

export default Footer;
