import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  InputAdornment,
  type TextFieldProps,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Search as SearchIcon,
  Person,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';

const mockDestinations = [
  'Warszawa', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan',
  'Szczecin', 'Lublin', 'Katowice', 'Bialystok', 'Torun',
];

const HeaderSearch = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [guests, setGuests] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/search');
  };

  const datePickerTextFieldProps = (label: string): TextFieldProps => ({
    label,
    variant: 'standard',
    size: 'small',
    InputProps: {
      disableUnderline: true,
      readOnly: true,
    },
    placeholder: 'dd/mm/yyyy',
    sx: {
      '& .MuiInputBase-root': {
        fontWeight: 500,
        color: 'text.primary',
      },
      '& .MuiPickersInputBase-root': { marginTop: 0 },
      '& .MuiInputBase-input': {
        padding: '4px 8px',
        fontWeight: 500,
      },
      '& label': {
        fontSize: '0.9rem',
        fontWeight: 500,
        color: 'text.secondary',
        top: '50%',
        transform: 'translateY(-50%)',
      },
      '& .MuiInputLabel-shrink': {
        opacity: 0,
      },
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          borderRadius: '50px',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          maxWidth: '900px',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Box sx={{ minWidth: '180px', px: 2, py: 1 }}>
          <Autocomplete
            size="small"
            options={mockDestinations}
            value={selectedLocation}
            onChange={(_, newValue) => setSelectedLocation(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Where"
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'text.primary',
                  },
                  '& .MuiInputBase-input': {
                    padding: '4px 8px',
                  },
                }}
              />
            )}
          />
        </Box>

        <Box sx={{ width: '1px', height: '32px', backgroundColor: 'divider' }} />

        <Box sx={{ minWidth: '120px', px: 2, py: 1 }}>
          <DatePicker
            value={checkIn}
            onChange={(newValue) => setCheckIn(newValue)}
            format="DD/MM/YYYY"
            slotProps={{
              textField: datePickerTextFieldProps('Check in'),
            }}
          />
        </Box>

        <Box sx={{ width: '1px', height: '32px', backgroundColor: 'divider' }} />

        <Box sx={{ minWidth: '120px', px: 2, py: 1 }}>
          <DatePicker
            value={checkOut}
            onChange={(newValue) => setCheckOut(newValue)}
            format="DD/MM/YYYY"
            slotProps={{
              textField: datePickerTextFieldProps('Check out'),
            }}
          />
        </Box>

        <Box sx={{ width: '1px', height: '32px', backgroundColor: 'divider' }} />

        <Box sx={{ maxWidth: '130px', px: 2, py: 1 }}>
          <TextField
            placeholder="Guests"
            variant="standard"
            size="small"
            type="number"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: 14,
                fontWeight: 500,
                color: 'text.primary',
              },
              '& .MuiInputBase-input': {
                padding: '4px 8px',
              },
            }}
          />
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={handleSearch}
          sx={{
            minWidth: 'auto',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            m: 0.5,
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          <SearchIcon sx={{ fontSize: 20 }} />
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default HeaderSearch;

