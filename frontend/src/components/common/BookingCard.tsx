import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Button,
    Stack,
} from '@mui/material';
import {
    CalendarToday as CalendarIcon,
    LocationOn as LocationIcon,
    Chat as ChatIcon,
    People as PeopleIcon,
} from '@mui/icons-material';

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Confirmed': return 'success';
        case 'Pending': return 'warning';
        case 'Completed': return 'info';
        default: return 'default';
    }
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const BookingCard = ({ booking }: { booking: any }) => {
    const isPast = booking.status === 'Completed' || booking.status === 'Cancelled';
    const location = [booking.offer.addressCity, booking.offer.addressCountry]
        .filter(Boolean)
        .join(', ');

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                },
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="160"
                    image={booking.offer.coverPhotoUrl}
                    alt={booking.offer.title}
                    sx={{
                        objectFit: 'cover',
                        filter: isPast ? 'grayscale(100%)' : 'none'
                    }}
                />
                <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                    <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status) as any}
                        size="small"
                        sx={{ fontWeight: 700, borderRadius: 20, boxShadow: 1 }}
                    />
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column' }}>
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 700,
                        fontSize: '1.15rem',
                        mb: 1,
                        color: 'text.primary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {booking.offer.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600, color: 'text.primary', mb: 1.5 }}
                >
                    <LocationIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                    {location}
                </Typography>

                <Stack spacing={1} sx={{ mb: 2, gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PeopleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                            {booking.numberOfGuests} Guest{booking.numberOfGuests > 1 ? 's' : ''}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                            {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
                        </Typography>
                    </Box>
                </Stack>

                <Typography
                    variant="h5"
                    component="span"
                    sx={{ fontWeight: 700, color: 'primary.dark', mt: 'auto', mb: 1.5 }}
                >
                    ${booking.totalPrice.toFixed(2)}
                </Typography>

                <Stack direction="row" spacing={1}>
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{ 
                            borderRadius: 25, 
                            px: 3, 
                            fontWeight: 700, 
                            textTransform: 'none', 
                            flexGrow: 1,
                            ...(isPast && {
                                bgcolor: '#e0e0e0',
                                color: '#757575',
                                boxShadow: 'none',
                                '&:hover': {
                                    bgcolor: '#d5d5d5',
                                    boxShadow: 'none',
                                }
                            })
                        }}
                    >
                        View Details
                    </Button>
                    {(booking.status === 'Confirmed' || booking.status === 'Pending') && (
                        <Button
                            variant="outlined"
                            size="medium"
                            sx={{
                                minWidth: 40, height: 40, p: 0, borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            <ChatIcon fontSize="small" />
                        </Button>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default BookingCard;
