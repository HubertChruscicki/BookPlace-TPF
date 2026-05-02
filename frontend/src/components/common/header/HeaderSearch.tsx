import { useState } from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import { Search as SearchIcon, LocationOn as LocationIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HeaderSearch = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim().length === 0) {
      navigate('/search');
      return;
    }

    const params = new URLSearchParams();
    params.set('City', query.trim());
    params.set('PageNumber', '1');
    params.set('PageSize', '12');
    navigate(`/search?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        borderRadius: '50px',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
      }}
    >
      <TextField
        size="small"
        placeholder="Where"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          minWidth: '200px',
          px: 2,
          '& .MuiInputBase-input': {
            padding: '8px 4px',
          },
        }}
      />
      <Button
        onClick={handleSearch}
        size="small"
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{
          borderRadius: 0,
          height: '100%',
          px: 2,
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default HeaderSearch;

