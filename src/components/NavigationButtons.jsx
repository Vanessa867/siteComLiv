import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const canGoBack = location.pathname !== '/';

  return (
    <div style={{ marginBottom: '20px' }}>
      {canGoBack && (
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
