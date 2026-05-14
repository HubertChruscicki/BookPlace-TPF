import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { OfferSortBy } from '../../../models/OfferModels';
import FiltersModal, { type FilterValues } from './FiltersModal';
import { theme } from '../../../theme';
import type { SelectChangeEvent } from '@mui/material/Select';

interface SearchHeaderProps {
  totalCount: number;
  city?: string;
  sortBy?: OfferSortBy;
  onSortChange: (sortBy: OfferSortBy | undefined) => void;
  onFiltersChange: (filters: FilterValues) => void;
  activeFilters: FilterValues;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  sortBy,
  onSortChange,
  onFiltersChange,
  activeFilters,
}) => {
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (activeFilters.minPrice !== undefined || activeFilters.maxPrice !== undefined) count += 1;
    if (activeFilters.rooms) count += 1;
    if (activeFilters.singleBeds) count += 1;
    if (activeFilters.doubleBeds) count += 1;
    if (activeFilters.sofas) count += 1;
    if (activeFilters.bathrooms) count += 1;
    if (activeFilters.amenities && activeFilters.amenities.length > 0) count += 1;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: 2,
        mt: 5,
        mb: 2,
      }}
    >
      <Box>
        <Typography
          variant="h3"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Explore accommodations
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mt: 0.5,
          }}
        >
          Find the perfect place for your next getaway.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="sort-select-label">Sort</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortBy !== undefined ? sortBy.toString() : ''}
            label="Sort"
            onChange={(e: SelectChangeEvent<string>) => {
              const value = e.target.value;
              onSortChange(value === '' ? undefined : (parseInt(value, 10) as OfferSortBy));
            }}
            sx={{ borderRadius: 20, px: 1 }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={OfferSortBy.PriceAsc.toString()}>Price: Low to High</MenuItem>
            <MenuItem value={OfferSortBy.PriceDesc.toString()}>Price: High to Low</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          startIcon={<TuneIcon />}
          onClick={() => setFiltersModalOpen(true)}
          sx={{
            minWidth: '100px',
            borderRadius: '20px',
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            fontWeight: 500,
            '&:hover': {
              borderColor: theme.palette.primary.dark,
            },
          }}
        >
          Filters
          {activeFiltersCount > 0 && (
            <Chip
              label={activeFiltersCount}
              size="small"
              color="primary"
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                height: 20,
                minWidth: 20,
                '& .MuiChip-label': {
                  fontSize: '0.75rem',
                  px: 0.5,
                },
              }}
            />
          )}
        </Button>
      </Box>

      <FiltersModal
        open={filtersModalOpen}
        onClose={() => setFiltersModalOpen(false)}
        onApplyFilters={onFiltersChange}
        initialFilters={activeFilters}
      />
    </Box>
  );
};

export default SearchHeader;

