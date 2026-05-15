import React from 'react';
import { Container, Typography } from '@mui/material';
import HorizontalBookingScroll from '../components/features/booking/HorizontalBookingScroll';
import { mockUpcomingBookings, mockPastBookings } from '../mocks/bookings';

const MyBookingsPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ pt: 0, pb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>My Bookings</Typography>
            <HorizontalBookingScroll title="Upcoming reservations" bookings={mockUpcomingBookings} />
            <HorizontalBookingScroll title="Past reservations" bookings={mockPastBookings} />
        </Container>
    );
};

export default MyBookingsPage;
