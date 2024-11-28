import React, { useState } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Button, Typography, IconButton, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageIcon from '@mui/icons-material/Language';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardLayout from '../components/DashboardLayout';

const ConfigPage = () => {
  const [language, setLanguage] = useState('pt'); // Estado para alternar o idioma

  // Função para alternar entre idiomas
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'pt' ? 'en' : 'pt')); // Alterna entre português e inglês
  };

  // Função para simular a exclusão da conta
  const deleteAccount = () => {
    alert('Conta excluída com sucesso!');
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
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
            Mudar para {language === 'pt' ? 'Inglês' : 'Português'}
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
    </DashboardLayout>
  );
};

export default ConfigPage;
