import React, { useRef, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Stack,
    IconButton,
} from '@mui/material';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import BookingCard from '../../common/BookingCard';

interface HorizontalBookingScrollProps {
    title: string;
    bookings: any[];
}

const HorizontalBookingScroll: React.FC<HorizontalBookingScrollProps> = ({ title, bookings }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [bookings]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
            setTimeout(checkScroll, 400);
        }
    };

    if (bookings.length === 0) return null;

    return (
        <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {title} ({bookings.length})
                </Typography>
                <Stack direction="row" spacing={1.5}>
                    <IconButton
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        sx={{ border: '1px solid', borderColor: 'divider' }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        sx={{ border: '1px solid', borderColor: 'divider' }}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </Stack>
            </Box>

            <Box
                ref={scrollRef}
                onScroll={checkScroll}
                sx={{
                    display: 'flex', gap: 2, overflowX: 'auto', pb: 1,
                    scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }
                }}
            >
                {bookings.map((booking) => (
                    <Box key={booking.id} sx={{ minWidth: 320, maxWidth: 320, flexShrink: 0 }}>
                        <BookingCard booking={booking} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default HorizontalBookingScroll;
