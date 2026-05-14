import { Box } from '@mui/material';
import WelcomeAndSearchSection from '../components/features/welcome-search/WelcomeAndSearchSection';
import ExploreCategoriesSection from '../components/features/welcome-search/ExploreCategoriesSection';

const LandingPage = () => {
    return (
        <Box 
            sx={{
            width: '100%',
            minHeight: '100vh',
            overflowX: 'hidden',
            py: 6
        }}>
            <WelcomeAndSearchSection />
            <ExploreCategoriesSection />
        </Box>
    );
};

export default LandingPage;

