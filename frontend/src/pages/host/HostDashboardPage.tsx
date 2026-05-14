import { Box, Typography, Grid, Container } from '@mui/material';
import {
    Bookmark,
    Payments,
    HomeWork,
    Groups,
    Star,
    DonutLarge,
} from '@mui/icons-material';
import DashboardStatsCard from '../../components/features/host/DashboardStatsCard';

export default function HostDashboardPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box mb={4}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    Welcome back, Sarah
                </Typography>
                <Typography color="text.secondary">
                    Here is what's happening with your properties today.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <DashboardStatsCard
                        title="Total Bookings"
                        value="142"
                        icon={Bookmark}
                        colorVariant="blue"
                        trend={{ value: 12.5, isPositive: true }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <DashboardStatsCard
                        title="Monthly Revenue"
                        value="$12,450"
                        icon={Payments}
                        colorVariant="green"
                        trend={{ value: 8.2, isPositive: true }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <DashboardStatsCard
                        title="Active Offers"
                        value="6"
                        icon={HomeWork}
                        colorVariant="orange"
                        trend={{ value: 0.0, isPositive: true }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <DashboardStatsCard
                        title="Total Guests"
                        value="328"
                        icon={Groups}
                        colorVariant="purple"
                        trend={{ value: 24.1, isPositive: true }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <DashboardStatsCard
                        title="Average Rating"
                        value="4.9"
                        maxValue="/ 5.0"
                        icon={Star}
                        colorVariant="yellow"
                        trend={{ value: 0.2, isPositive: true }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <DashboardStatsCard
                        title="Occupancy Rate"
                        value="78%"
                        icon={DonutLarge}
                        colorVariant="lightBlue"
                        trend={{ value: 2.4, isPositive: false }}
                        progress={78}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}