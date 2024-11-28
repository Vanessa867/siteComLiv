import React, { useState } from 'react';
import '../Styles/config.css';
import { Box, Accordion, AccordionSummary, AccordionDetails, Button, Typography, IconButton, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

export default function Config() {
  const [themeMode, setThemeMode] = useState('light'); // Estado para alternar o tema
  const [language, setLanguage] = useState('en'); // Estado para alternar o idioma
  const [isDeleted, setIsDeleted] = useState(false); // Estado para simular a exclusão de conta
  const theme = useTheme();

  // Função para alternar entre tema claro e escuro
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Função para alternar entre idiomas
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'pt' : 'en')); // Alterna entre inglês e português
  };

  // Função para simular a exclusão da conta
  const deleteAccount = () => {
    setIsDeleted(true);
    alert('Conta excluída com sucesso!');
  };

  return (
    <Box sx={{
      padding: '20px',
      maxWidth: 600,  // Largura máxima de 600px para garantir uma boa visualização
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',  // Centraliza os itens na horizontal
      justifyContent: 'center', // Centraliza os itens na vertical
      minHeight: '100vh',  // Garante que a altura mínima da tela será a altura total da janela
      backgroundColor: themeMode === 'light' ? '#f9f9f9' : '#333',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center', color: themeMode === 'light' ? '#9a358a' : '#fff' }}>
        Configurações
      </Typography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <IconButton sx={{ marginRight: '10px' }}><LanguageIcon /></IconButton>
          <Typography>Alterar Idioma</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button 
            variant="contained" 
            sx={{ width: '100%' }} 
            onClick={toggleLanguage}
          >
            Mudar para {language === 'en' ? 'Português' : 'Inglês'}
          </Button>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ margin: '10px 0' }} />

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <IconButton sx={{ marginRight: '10px' }}><Brightness4Icon /></IconButton>
          <Typography>Alterar Tema</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button 
            variant="contained" 
            sx={{ width: '100%' }} 
            onClick={toggleTheme}
          >
            Mudar para tema {themeMode === 'light' ? 'Escuro' : 'Claro'}
          </Button>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ margin: '10px 0' }} />

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <IconButton sx={{ marginRight: '10px' }}><DeleteIcon /></IconButton>
          <Typography>Excluir Conta</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button 
            variant="contained" 
            color="error"
            sx={{ width: '100%' }} 
            onClick={deleteAccount}
          >
            Excluir conta permanentemente
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
