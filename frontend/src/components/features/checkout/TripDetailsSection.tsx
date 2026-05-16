import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import dayjs, { type Dayjs } from 'dayjs';

interface TripDetailsSectionProps {
  checkIn: Dayjs | null;
  checkOut: Dayjs | null;
  guests: number;
  maxGuests: number;
  nights: number;
  setCheckIn: (date: Dayjs | null) => void;
  setCheckOut: (date: Dayjs | null) => void;
  setGuests: (count: number) => void;
}

const DISPLAY_FORMAT = 'DD/MM/YYYY';

const TripDetailsSection: React.FC<TripDetailsSectionProps> = ({
  checkIn,
  checkOut,
  guests,
  maxGuests,
  nights,
  setCheckIn,
  setCheckOut,
  setGuests,
}) => {
  const [isEditing, setIsEditing] = useState(!checkIn || !checkOut || nights <= 0);
  const [localCheckIn, setLocalCheckIn] = useState(checkIn);
  const [localCheckOut, setLocalCheckOut] = useState(checkOut);
  const [localGuests, setLocalGuests] = useState(guests);

  useEffect(() => {
    setLocalCheckIn(checkIn);
    setLocalCheckOut(checkOut);
    setLocalGuests(guests);
    if (!checkIn || !checkOut || nights <= 0) {
      setIsEditing(true);
    }
  }, [checkIn, checkOut, guests, nights]);

  const canSave =
    !!localCheckIn && !!localCheckOut && localCheckOut.diff(localCheckIn, 'day') > 0;

  const handleSave = () => {
    if (!canSave) {
      window.alert('Please select valid dates (Check-out must be after Check-in).');
      return;
    }
    setCheckIn(localCheckIn);
    setCheckOut(localCheckOut);
    setGuests(localGuests);
    setIsEditing(false);
  };

  const renderViewMode = () => (
    <Stack spacing={1.5}>
      <Typography variant="body1" fontWeight={600}>
        Dates:
        <Box component="span" sx={{ ml: 1, color: 'primary.main' }}>
          {checkIn && checkOut
            ? `${checkIn.format(DISPLAY_FORMAT)} - ${checkOut.format(DISPLAY_FORMAT)}`
            : 'Select stay dates'}
        </Box>
      </Typography>
      <Typography variant="body1" fontWeight={600}>
        Guests:
        <Box component="span" sx={{ ml: 1, color: 'primary.main' }}>
          {guests} guest{guests > 1 ? 's' : ''}
        </Box>
      </Typography>
      <Typography color="text.secondary" variant="body2">
        Total nights: {nights}
      </Typography>
    </Stack>
  );

  const renderEditMode = () => (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <DatePicker
          label="Check-in"
          value={localCheckIn}
          minDate={dayjs()}
          onChange={(value) => setLocalCheckIn(value)}
          slotProps={{ textField: { fullWidth: true, size: 'small', sx: { borderRadius: 2 } } }}
          format={DISPLAY_FORMAT}
        />
        <DatePicker
          label="Check-out"
          value={localCheckOut}
          minDate={localCheckIn ? localCheckIn.add(1, 'day') : dayjs()}
          onChange={(value) => setLocalCheckOut(value)}
          slotProps={{ textField: { fullWidth: true, size: 'small', sx: { borderRadius: 2 } } }}
          format={DISPLAY_FORMAT}
        />
      </Stack>
      <FormControl fullWidth size="small">
        <InputLabel id="guests-label">Guests</InputLabel>
        <Select
          labelId="guests-label"
          label="Guests"
          value={localGuests}
          onChange={(event) => setLocalGuests(Number(event.target.value))}
          sx={{ borderRadius: 2 }}
        >
          {Array.from({ length: maxGuests }, (_, idx) => idx + 1).map((number) => (
            <MenuItem key={number} value={number}>
              {number} guest{number > 1 ? 's' : ''}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Your trip</Typography>
        {isEditing ? (
          <Button
            variant="contained"
            size="small"
            onClick={handleSave}
            startIcon={<CheckIcon />}
            sx={{ borderRadius: 25, textTransform: 'none' }}
            disabled={!canSave}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="small"
            onClick={() => setIsEditing(true)}
            startIcon={<EditIcon />}
            sx={{ borderRadius: 25, textTransform: 'none' }}
          >
            Edit
          </Button>
        )}
      </Stack>
      {isEditing ? renderEditMode() : renderViewMode()}
    </Paper>
  );
};

export default TripDetailsSection;
