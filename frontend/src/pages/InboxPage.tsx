import React from 'react';
import { Box } from '@mui/material';
import ChatClient from '../components/features/chat/ChatClient';

const InboxPage: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, md: 3 } }}>
      <ChatClient role="guest" />
    </Box>
  );
};

export default InboxPage;

