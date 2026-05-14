import { Box, Card, CardMedia } from '@mui/material';

const WelcomeImageGrid = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'grid',
                // Na mobilce 3 kolumny, od sm wzwyż stary układ 10 kolumn
                gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(10, 1fr)' },
                gridTemplateRows: { xs: '1fr', sm: 'repeat(8, 1fr)' },
                gap: { xs: 1, sm: 1.5, md: 2 },
                height: {
                    xs: '120px', // Znacznie mniejsza wysokość na mobilce (rozwiązuje problem BiP)
                    sm: '500px',
                    md: '40vw',
                    lg: '700px'
                },
                width: '100%',
                order: { xs: 2, md: 2 },
                gridColumn: { xs: '1', md: '2' },
                gridRow: { xs: '2', md: '1 / span 2' },
                alignSelf: 'start',
                overflow: 'hidden',
                mt: { xs: 2, sm: 0 } // Odstęp od nagłówka na mobilce
            }}
        >
            {/* ZDJĘCIE 1 - Widoczne zawsze */}
            <Card sx={{
                gridArea: { xs: '1 / 1 / 2 / 2', sm: '1 / 1 / 5 / 5' },
                borderRadius: { xs: '24px', sm: '50px 0px 0px 0px' },
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' }
            }}>
                <CardMedia component="img" height="100%" image="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=300&fit=crop" alt="Santorini Greece" sx={{ objectFit: 'cover' }} />
            </Card>

            {/* ZDJĘCIE 2 - Widoczne zawsze */}
            <Card sx={{
                gridArea: { xs: '1 / 2 / 2 / 3', sm: '2 / 5 / 6 / 8' },
                borderRadius: { xs: '24px', sm: '0px 50px 50px 0px' },
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' }
            }}>
                <CardMedia component="img" height="100%" image="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=400&fit=crop" alt="Coastal City" sx={{ objectFit: 'cover' }} />
            </Card>

            {/* ZDJĘCIE 3 - Widoczne zawsze */}
            <Card sx={{
                gridArea: { xs: '1 / 3 / 2 / 4', sm: '4 / 8 / 9 / 11' },
                borderRadius: { xs: '24px', sm: '0px 50px 10px 10px' },
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' }
            }}>
                <CardMedia component="img" height="100%" image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=500&fit=crop&sat=-30" alt="Mountain Landscape" sx={{ objectFit: 'cover' }} />
            </Card>

            {/* ZDJĘCIE 4 - UKRYTE NA MOBILCE */}
            <Card sx={{
                display: { xs: 'none', sm: 'block' },
                gridArea: '5 / 1 / 9 / 5',
                borderRadius: '0px 20px 0px 0px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' }
            }}>
                <CardMedia component="img" height="100%" image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop" alt="Beautiful Sky" sx={{ objectFit: 'cover' }} />
            </Card>

            {/* ZDJĘCIE 5 - UKRYTE NA MOBILCE */}
            <Card sx={{
                display: { xs: 'none', sm: 'block' },
                gridArea: '6 / 5 / 9 / 8',
                borderRadius: '10px 10px 10px 10px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' }
            }}>
                <CardMedia component="img" height="100%" image="https://images.unsplash.com/photo-1528181304800-259b08848526?w=300&h=400&fit=crop" alt="Cultural Temple" sx={{ objectFit: 'cover' }} />
            </Card>
        </Box>
    );
};

export default WelcomeImageGrid;
