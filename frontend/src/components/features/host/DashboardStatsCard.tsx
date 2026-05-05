import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    colorVariant: 'blue' | 'green' | 'orange' | 'purple' | 'yellow' | 'lightBlue';
    trend?: {
        value: number;
        isPositive: boolean;
    };
    progress?: number; 
    maxValue?: string; 
}

const cardStyles = {
    blue: { grad: 'linear-gradient(135deg, #1A6CFF 0%, #0045FF 100%)' },
    green: { grad: 'linear-gradient(135deg, #00B686 0%, #008A65 100%)' },
    orange: { grad: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)' },
    purple: { grad: 'linear-gradient(135deg, #6F42C1 0%, #46218E 100%)' },
    yellow: { grad: 'linear-gradient(135deg, #F1C40F 0%, #D4AC0D 100%)' },
    lightBlue: { grad: 'linear-gradient(135deg, #0099F7 0%, #0077C2 100%)' },
};

export default function DashboardStatsCard({
    title,
    value,
    icon: Icon,
    colorVariant,
    trend,
    progress,
    maxValue
}: StatsCardProps) {
    const styles = cardStyles[colorVariant];

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                background: styles.grad,
                color: '#fff',
                height: '200px',
                position: 'relative',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
            }}
        >
            <CardContent sx={{ p: 3, height: '100%', boxSizing: 'border-box' }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                            p: 1,
                            display: 'flex',
                        }}
                    >
                        <Icon sx={{ fontSize: 20 }} />
                    </Box>

                    {trend && (
                        <Box
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 5,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                backdropFilter: 'blur(4px)',
                            }}
                        >
                            {trend.value === 0 ? (
                                <Box sx={{ width: 10, height: 2, bgcolor: '#fff', opacity: 0.8 }} />
                            ) : trend.isPositive ? (
                                <TrendingUp sx={{ fontSize: 14 }} />
                            ) : (
                                <TrendingDown sx={{ fontSize: 14 }} />
                            )}
                            <Typography variant="caption" fontWeight={600}>
                                {trend.isPositive && trend.value > 0 ? '+' : ''}{trend.value}%
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Box mt="auto">
                    <Typography sx={{ opacity: 0.9, fontSize: '0.85rem', fontWeight: 500, mb: 0.5 }}>
                        {title}
                    </Typography>
                    <Box display="flex" alignItems="baseline" gap={0.5}>
                        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.8rem' }}>
                            {value}
                        </Typography>
                        {maxValue && (
                            <Typography sx={{ opacity: 0.7, fontSize: '0.9rem' }}>
                                {maxValue}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {progress !== undefined && (
                    <Box sx={{ mt: 2 }}>
                        <LinearProgress 
                            variant="determinate" 
                            value={progress} 
                            sx={{ 
                                height: 6, 
                                borderRadius: 3, 
                                bgcolor: 'rgba(255,255,255,0.2)',
                                '& .MuiLinearProgress-bar': { bgcolor: '#fff' }
                            }} 
                        />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}