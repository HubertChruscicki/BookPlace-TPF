import React from 'react';
import { Box } from '@mui/material';
import { SignInButton, SignUpButton } from './Header.styles';

const HeaderUserSection: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <SignInButton variant="contained">Sign In</SignInButton>
      <SignUpButton variant="outlined">Sign Up</SignUpButton>
    </Box>
  );
};

export default HeaderUserSection;

