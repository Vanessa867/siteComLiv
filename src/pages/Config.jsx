import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, Typography, IconButton, Divider, TextField, Switch, FormControlLabel, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DashboardLayout from '../components/DashboardLayout';
import '../Styles/ConfigPage.css'; 

const ConfigPage = () => {
  const deleteAccount = () => {
    alert('Conta excluída com sucesso!');
  };

  const updatePassword = () => {
    alert('Senha alterada com sucesso!');
  };

  return (
    <DashboardLayout>
      <Box className="config-container">
        <Typography variant="h4" className="config-title">
          Configurações
        </Typography>
        <br></br>

        <Accordion className="config-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Alterar Senha</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField 
              label="Senha Atual" 
              type="password" 
              fullWidth 
              margin="normal" 
              className="config-input"
            />
            <TextField 
              label="Nova Senha" 
              type="password" 
              fullWidth 
              margin="normal" 
              className="config-input"
            />
            <TextField 
              label="Confirmar Nova Senha" 
              type="password" 
              fullWidth 
              margin="normal" 
              className="config-input"
            />
            <Button
              variant="contained"
              color="primary"
              className="config-button"
              onClick={updatePassword}
            >
              Atualizar Senha
            </Button>
          </AccordionDetails>
        </Accordion>

        <Divider className="config-divider" />

        <Accordion className="config-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Notificações</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel 
              control={<Switch defaultChecked />} 
              label="Notificações por E-mail" 
              className="config-switch"
            />
            <FormControlLabel 
              control={<Switch />} 
              label="Notificações Push" 
              className="config-switch"
            />
            <FormControlLabel 
              control={<Switch />} 
              label="Notificações por SMS" 
              className="config-switch"
            />
          </AccordionDetails>
        </Accordion>

        <Divider className="config-divider" />

        <Accordion className="config-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <DarkModeIcon className="config-icon" />
            <Typography>Preferências de Tema</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel 
              control={<Switch />} 
              label="Modo Escuro" 
              className="config-switch"
            />
          </AccordionDetails>
        </Accordion>

        <Divider className="config-divider" />

        <Accordion className="config-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <IconButton className="config-icon">
              <DeleteIcon />
            </IconButton>
            <Typography>Excluir Conta</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              variant="contained"
              color="error"
              className="config-button"
              onClick={deleteAccount}
            >
              Excluir conta permanentemente
            </Button>
          </AccordionDetails>
        </Accordion>
      </Box>
    </DashboardLayout>
  );
};

export default ConfigPage;