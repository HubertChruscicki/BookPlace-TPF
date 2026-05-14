import { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { styled, alpha, Box } from '@mui/material';

const StyledCalendarWrapper = styled(Box)(({  }) => ({
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '20px',
    border: '1px solid #edf2f7',
    padding: '24px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',

    '.fc': {
        fontFamily: 'inherit',
        border: 'none',
    },

    // Toolbar - stylizacja desktopowa
    '.fc-header-toolbar': {
        marginBottom: '30px !important',
        display: 'flex',
        alignItems: 'center',
    },

    '.fc-toolbar-title': {
        fontSize: '1.25rem !important',
        fontWeight: '700 !important',
        color: '#1a202c',
    },

    // Przyciski nawigacji
    '.fc-button': {
        background: '#fff !important',
        border: '1px solid #e2e8f0 !important',
        color: '#4a5568 !important',
        fontWeight: '600',
        padding: '8px 16px',
        borderRadius: '12px !important',
        transition: 'all 0.2s ease',
        '&:hover': {
            background: '#f7fafc !important',
            borderColor: '#cbd5e0 !important',
        },
        '&:focus': { boxShadow: 'none !important' }
    },

    '.fc-today-button': {
        fontSize: '0.875rem',
        padding: '8px 24px !important',
        marginRight: '20px !important',
    },

    // Siatka kalendarza
    '.fc-theme-standard td, .fc-theme-standard th': {
        border: '1px solid #f0f4f8 !important',
    },

    '.fc-col-header-cell': {
        padding: '16px 0 !important',
        background: '#fff',
        '& .fc-col-header-cell-cushion': {
            color: '#718096',
            fontWeight: '500',
            textDecoration: 'none',
        }
    },

    '.fc-daygrid-day-number': {
        padding: '12px !important',
        color: '#a0aec0',
        fontWeight: '500',
        textDecoration: 'none !important',
    },

    '.fc-day-today': {
        background: alpha('#3182ce', 0.03) + ' !important',
    },

    // Stylowanie kart wydarzeń
    '.fc-event': {
        background: 'none !important',
        border: 'none !important',
        cursor: 'pointer',
    },

    '.custom-event': {
        margin: '2px 4px',
        padding: '6px 10px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: '600',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
}));

interface HostCalendarProps {
    bookings: any[];
    onDateRangeChange: (start: Date, end: Date) => void;
    onEventClick?: (bookingId: string) => void;
}

export default function HostCalendar({ bookings, onDateRangeChange, onEventClick }: HostCalendarProps) {
    const events = useMemo(() => bookings.map(booking => {
        let colors = { bg: '#edf2f7', border: '#a0aec0', text: '#4a5568' }; // Blocked

        if (booking.status === 'Confirmed') {
            colors = { bg: '#e6f7f1', border: '#10b981', text: '#065f46' };
        } else if (booking.status === 'Pending') {
            colors = { bg: '#fff7ed', border: '#f59e0b', text: '#92400e' };
        }

        const endDay = new Date(booking.checkOutDate);
        endDay.setDate(endDay.getDate() + 1);

        return {
            id: booking.id.toString(),
            title: booking.offer.title,
            start: booking.checkInDate,
            end: endDay.toISOString().split('T')[0],
            extendedProps: { ...colors }
        };
    }), [bookings]);

    return (
        <StyledCalendarWrapper>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'today',
                    center: 'title',
                    right: 'prev,next'
                }}
                events={events}
                datesSet={(info) => onDateRangeChange(info.start, info.end)}
                eventClick={(info) => onEventClick?.(info.event.id)}
                eventContent={(eventInfo) => (
                    <Box className="custom-event" sx={{ 
                        bgcolor: eventInfo.event.extendedProps.bg,
                        color: eventInfo.event.extendedProps.text,
                        borderLeft: `4px solid ${eventInfo.event.extendedProps.border}`
                    }}>
                        {eventInfo.event.title}
                    </Box>
                )}
                height="750px"
                fixedWeekCount={false}
                firstDay={1}
            />
        </StyledCalendarWrapper>
    );
}