import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Chip } from '@mui/material';
import {
  Dashboard,
  BookOnline,
  CalendarMonth,
  Home,
  ChatBubbleOutline,
} from '@mui/icons-material';

const NAVIGATION_ITEMS = [
  {
    value: 'dashboard',
    label: 'Dashboard',
    icon: <Dashboard />,
    path: '/host/dashboard',
  },
  {
    value: 'bookings',
    label: 'Bookings',
    icon: <BookOnline />,
    path: '/host/bookings',
  },
  {
    value: 'calendar',
    label: 'Calendar',
    icon: <CalendarMonth />,
    path: '/host/calendar',
  },
  {
    value: 'offers',
    label: 'My Offers',
    icon: <Home />,
    path: '/host/offers',
  },
  {
    value: 'inbox',
    label: 'Inbox',
    icon: <ChatBubbleOutline />,
    path: '/host/inbox',
  },
];

export default function HeaderHostNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentSection = React.useMemo(() => {
    const pathParts = location.pathname.split('/');
    const section = pathParts[2];
    return section || 'dashboard';
  }, [location.pathname]);

  const handleSectionChange = (section: string) => {
    const item = NAVIGATION_ITEMS.find((navItem) => navItem.value === section);
    if (item) {
      navigate(item.path);
    }
  };

  const DesktopNavigation = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        maxWidth: '100%',
        overflow: 'auto',
      }}
    >
      {NAVIGATION_ITEMS.map((item) => {
        const isActive = currentSection === item.value;
        return (
          <Chip
            key={item.value}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {React.cloneElement(item.icon, { sx: { fontSize: 18 } })}
                {item.label}
              </Box>
            }
            onClick={() => handleSectionChange(item.value)}
            sx={{
              px: 2,
              py: 0.5,
              height: 36,
              fontSize: '0.875rem',
              fontWeight: 500,
              borderRadius: 20,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              border: 'none',
              bgcolor: isActive ? 'primary.main' : 'transparent',
              color: isActive ? 'white' : 'text.primary',
              '&:hover': {
                bgcolor: isActive ? 'primary.dark' : 'action.hover',
                transform: 'translateY(-1px)',
              },
              '&:focus': {
                outline: 'none',
              },
            }}
          />
        );
      })}
    </Box>
  );

  return <DesktopNavigation />;
}
