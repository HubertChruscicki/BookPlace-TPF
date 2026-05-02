import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookPlaceLogo: React.FC = () => {
  const navigate = useNavigate();
  const logoSrc = '/logo.png';

  return (
    <Box
      onClick={() => navigate('/')}
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <img
        src={logoSrc}
        alt="BookPlace"
        style={{
          height: '48px',
          width: 'auto',
          marginRight: '8px',
        }}
      />
    </Box>
  );
};

export default BookPlaceLogo;
