import { useState } from 'react';
import { Box, Typography, MenuItem, Select, FormControl } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import HostCalendar from '../../components/features/host/HostCalendar';

const MOCK_DATA = [
    { id: 1, status: 'Confirmed', checkInDate: '2026-05-05', checkOutDate: '2026-05-07', offer: { title: 'MD: Kowalski (3 nights)' } },
    { id: 2, status: 'Confirmed', checkInDate: '2026-05-08', checkOutDate: '2026-05-09', offer: { title: 'MD: Kowalski' } },
    { id: 3, status: 'Pending', checkInDate: '2026-05-17', checkOutDate: '2026-05-20', offer: { title: 'AW: Pending Smith' } },
    { id: 4, status: 'Blocked', checkInDate: '2026-05-20', checkOutDate: '2026-05-29', offer: { title: 'Maintenance' } },
];

export default function HostCalendarPage() {
    const [offerFilter, setOfferFilter] = useState('all');

    return (
        <Box sx={{ 
            backgroundColor: '#f8fafc', 
            minHeight: '100vh', 
            p: '40px' 
        }}>
            <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
                
                {/* Desktop Header */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    mb: 4 
                }}>
                    <Box>
                        <Typography variant="h3" sx={{ fontWeight: 800, fontSize: '2rem', color: '#1a202c', mb: 1 }}>
                            Calendar
                        </Typography>
                        <Typography sx={{ color: '#718096', fontSize: '1rem' }}>
                            Manage your availability and bookings across all properties.
                        </Typography>
                    </Box>

                    {/* Desktop Filter Dropdown */}
                    <FormControl variant="standard" sx={{ minWidth: 150 }}>
                        <Select
                            value={offerFilter}
                            onChange={(e) => setOfferFilter(e.target.value)}
                            displayEmpty
                            IconComponent={KeyboardArrowDown}
                            sx={{ 
                                fontWeight: 700, 
                                fontSize: '0.95rem',
                                '.MuiSelect-select': { paddingRight: '24px !important' },
                                '&:before, &:after': { display: 'none' }
                            }}
                        >
                            <MenuItem value="all">All Offers</MenuItem>
                            <MenuItem value="1">MD: Kowalski</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Calendar Card */}
                <HostCalendar 
                    bookings={MOCK_DATA} 
                    onDateRangeChange={(s, e) => console.log(s, e)}
                />

                {/* Desktop Legend Section */}
                <Box sx={{ 
                    mt: 3, 
                    p: '20px 32px', 
                    backgroundColor: '#fff', 
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    border: '1px solid #edf2f7'
                }}>
                    <Typography sx={{ fontWeight: 700, color: '#4a5568', fontSize: '0.9rem' }}>
                        Legend:
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <LegendItem color="#10b981" label="Confirmed" />
                        <LegendItem color="#f59e0b" label="Pending" />
                        <LegendItem color="#a0aec0" label="Blocked" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

function LegendItem({ color, label }: { color: string, label: string }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color }} />
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#718096' }}>
                {label}
            </Typography>
        </Box>
    );
}