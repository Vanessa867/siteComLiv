import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const canGoBack = location.pathname !== '/';

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '-20px' }}>      {canGoBack && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
