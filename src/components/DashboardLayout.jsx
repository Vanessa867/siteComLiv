import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';

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
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem button component={Link} to="/dashboard">
            <DashboardIcon />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/HomeDepoisDoLogin">
            <ShoppingCartIcon />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/reports">
            <BarChartIcon />
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button component={Link} to="/Config">
            <LayersIcon />
            <ListItemText primary="Configurações" />
          </ListItem>
        </List>
      </Drawer>

      {/* Conteúdo da Página */}
      <Box sx={{ flexGrow: 1, padding: '20px' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
          Dashboard
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
