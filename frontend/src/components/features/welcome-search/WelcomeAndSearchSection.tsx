import { Box } from '@mui/material';
import WelcomeContentText from './WelcomeContentText';
import WelcomeImageGrid from './WelcomeImageGrid';
import SearchCard from './SearchCard';

const WelcomeAndSearchSection = () => {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 5,
            maxWidth: '1700px',
            mx: 'auto',
            pb: '40px'
        }}>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                gridColumn: '1',
                zIndex: 10,
            }}>

                <Box>
                    <WelcomeContentText />
                </Box>

                <Box sx={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    mt: 8,
                    width: '180%',
                    maxWidth: '1000px',
                    zIndex: 20,
                }}>
                    <SearchCard />
                </Box>
            </Box>
            <WelcomeImageGrid />

        </Box>
    );
};

export default WelcomeAndSearchSection;
