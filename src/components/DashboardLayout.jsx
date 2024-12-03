import React from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../images/comliv.png';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const DashboardLayout = ({ children }) => {
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
            backgroundColor: '#F9F5FF', // Cor de fundo lilás claro
            color: '#6A1B9A', // Texto lilás escuro
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ textAlign: 'center', padding: '16px' }}>
          {/* Logo */}
          <img src={logo} alt="Logo do Site" style={{ maxWidth: '100%', marginBottom: '16px' }} />
          {/* Botão Criar Clube */}
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
          >
            Criar Clube
          </Button>
        </Box>
        <List>
          {/* Navegação Principal */}
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

          {/* Seção Clubes */}
          <Typography variant="h6" sx={{ padding: '16px', color: '#6A1B9A' }}>
            Clubes
          </Typography>
          <ListItem button component={Link} to="/favoritos">
            <StarIcon sx={{ color: '#6A1B9A' }} />
            <ListItemText primary="Favoritos" />
          </ListItem>
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
        {/* Seção Usuário */}
        <List>
          <Typography variant="h6" sx={{ padding: '16px', color: '#6A1B9A' }}>
            Usuário
          </Typography>
          <ListItem button component={Link} to="/perfil">
            <AccountCircleIcon sx={{ color: '#6A1B9A' }} />
            <ListItemText primary="Perfil" />
          </ListItem>
          <ListItem button component={Link} to="/premium">
            <CreditCardIcon sx={{ color: '#6A1B9A' }} />
            <ListItemText primary="PremiumLiv" />
          </ListItem>
          <ListItem button component={Link} to="/configuracoes">
            <SettingsIcon sx={{ color: '#6A1B9A' }} />
            <ListItemText primary="Configurações" />
          </ListItem>
          <ListItem button component={Link} to="/sair">
            <ExitToAppIcon sx={{ color: '#6A1B9A' }} />
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>

      {/* Conteúdo da Página */}
      <Box sx={{ flexGrow: 1, padding: '20px', backgroundColor: '#FFFFFF' }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;


