import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import AuthModal from '../../features/auth/AuthModal';
import { UserButton, SignInButton, SignUpButton } from './Header.styles';

const HeaderUserSection: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const handleSignInClick = () => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthModalMode('register');
    setAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setAuthModalOpen(false);
  };

  return (
    <>
      {isAuthenticated && user ? (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <UserButton variant="outlined">{user.name || user.email}</UserButton>
          <SignUpButton variant="outlined" onClick={logout}>
            Logout
          </SignUpButton>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SignInButton variant="contained" onClick={handleSignInClick}>
            Sign In
          </SignInButton>
          <SignUpButton variant="outlined" onClick={handleSignUpClick}>
            Sign Up
          </SignUpButton>
        </Box>
      )}

      {!isAuthenticated && (
        <AuthModal
          open={authModalOpen}
          onClose={handleAuthModalClose}
          initialTab={authModalMode}
        />
      )}
    </>
  );
};

export default HeaderUserSection;

