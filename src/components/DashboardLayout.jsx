import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/comliv.png';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const DashboardLayout = ({ children }) => {
  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar o diálogo
  const navigate = useNavigate(); // Para redirecionamento

  // Função para abrir o diálogo
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Função para fechar o diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Função para confirmar saída
  const handleConfirmExit = () => {
    setOpenDialog(false);
    // Lógica para deslogar, como limpar tokens ou estado
    navigate('/Home'); // Redireciona para a página inicial
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#F9F5FF',
            color: '#6A1B9A',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ textAlign: 'center', padding: '16px' }}>
          <img src={logo} alt="Logo do Site" style={{ maxWidth: '100%', marginBottom: '16px' }} />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#6A1B9A',
              color: '#FFFFFF',
              textTransform: 'none',
              marginBottom: '16px',
              '&:hover': { backgroundColor: '#5A1280' },
            }}
            fullWidth
            onClick={() => navigate('/CreateClub')} 
          >
            Criar Clube
          </Button>
        </Box>
        <List>
          <Typography variant="h6" sx={{ padding: '16px', color: '#6A1B9A' }}>
            Navegação
          </Typography>
          <ListItem button component={Link} to="/home">
            <HomeIcon sx={{ color: '#6A1B9A' }} />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/explorar">
            <ExploreIcon sx={{ color: '#6A1B9A' }} />
            <ListItemText primary="Explorar" />
          </ListItem>

          <Divider />

          <Typography variant="h6" sx={{ padding: '16px', color: '#6A1B9A' }}>
            Clubes
          </Typography>
          <ListItem button component={Link} to="/participando">
            <GroupIcon sx={{ color: '#6A1B9A' }} />
            <ListItemText primary="Participando" />
          </ListItem>
          <ListItem button component={Link} to="/meus-clubes">
            <FavoriteIcon sx={{ color: '#6A1B9A' }} />
            <ListItemText primary="Meus clubes" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <Typography variant="h6" sx={{ padding: '16px', color: '#6A1B9A' }}>
            Usuário
          </Typography>
          <ListItem button component={Link} to="/perfil">
            <AccountCircleIcon sx={{ color: '#6A1B9A' }} />
            <ListItemText primary="Perfil" />
          </ListItem>
          <ListItem button component={Link} to="/config">
            <SettingsIcon sx={{ color: '#6A1B9A' }} />
            <ListItemText primary="Configurações" />
          </ListItem>
          <ListItem button onClick={handleOpenDialog}>
            <ExitToAppIcon sx={{ color: '#6A1B9A' }} />
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>

      {/* Conteúdo da Página */}
      <Box sx={{ flexGrow: 1, padding: '20px', backgroundColor: '#FFFFFF' }}>
        {children}
      </Box>

      {/* Diálogo de Confirmação */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar saída</DialogTitle>
        <DialogContent>
          <DialogContentText>Você tem certeza que deseja sair da sua conta?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmExit} color="secondary" autoFocus>
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardLayout;
