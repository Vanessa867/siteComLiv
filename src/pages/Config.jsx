import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, Typography, IconButton, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardLayout from '../components/DashboardLayout';

const ConfigPage = () => {
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

      <Divider sx={{ margin: '10px 0' }} />
    </DashboardLayout>
  );
};

export default ConfigPage;
