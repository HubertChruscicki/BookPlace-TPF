import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';

const categories = [
  'All',
  'Beachfront',
  'Cabins',
  'Amazing Pools',
  'Mansions',
  'Treehouses',
];

const cards = [
  {
    title: 'Beachfront Paradise',
    description: 'Step straight from your deck into pristine waters and crystal clear shores.',
  },
  {
    title: 'Cozy Winter Cabin',
    description: 'A warm retreat nestled deep in a snowy forest, perfect for a peaceful getaway.',
  },
  {
    title: 'Modern Pool Villa',
    description: 'Experience ultimate luxury with an expansive private pool and stunning views.',
  },
];

const ExploreCategoriesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <Box sx={{ mt: 10 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: '22px',
          color: '#1a1c1c',
          mb: 2,
        }}
      >
        Explore Categories
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
        {categories.map((label, index) => (
          <Button
            key={label}
            variant={index === selectedCategory ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setSelectedCategory(index)}
            sx={{
              borderRadius: '999px',
              textTransform: 'none',
              px: 2,
              py: 0.5,
              fontSize: '12px',
              fontWeight: 600,
              borderColor: 'rgba(195, 198, 216, 0.5)',
              color: index === selectedCategory ? '#ffffff' : '#424656',
              backgroundColor: index === selectedCategory ? '#1a1c1c' : 'transparent',
              '&:hover': {
                borderColor: '#1a1c1c',
                backgroundColor: index === selectedCategory ? '#1a1c1c' : 'rgba(26, 28, 28, 0.08)',
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 3,
        }}
      >
        {cards.map((card, cardIndex) => (
          <Box
            key={card.title}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow:
                '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box
              component="img"
              src={`https://picsum.photos/seed/${selectedCategory * 3 + cardIndex}/900/600`}
              alt={card.title}
              sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <Box sx={{ p: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontSize: '16px', color: '#1a1c1c', mb: 0.5 }}
              >
                {card.title}
              </Typography>
              <Typography sx={{ color: '#737687', fontSize: '14px', lineHeight: 1.5 }}>
                {card.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExploreCategoriesSection;
