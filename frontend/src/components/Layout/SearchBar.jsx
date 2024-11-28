import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  InputBase,
  MenuItem,
  styled,
  Select,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

// Styled Components
const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'white',
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  maxWidth: '800px',
  margin: '0 8px',
  [theme.breakpoints.down('lg')]: { maxWidth: '600px' },
  [theme.breakpoints.down('md')]: {
    margin: '0 4px',
    maxWidth: '400px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: '#febd69',
  borderRadius: '0 4px 4px 0',
  '&:hover': { backgroundColor: '#f3a847' },
}));

const CategorySelect = styled(Select)(({ theme }) => ({
  backgroundColor: '#f3f3f3',
  borderRadius: '4px 0 0 4px',
  minWidth: '150px',
  '& .MuiSelect-select': {
    padding: theme.spacing(1),
    fontSize: {
      xs: '0.8rem',
      sm: '0.9rem',
      md: '1rem',
      lg: '1.1rem'
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  '&:hover': { backgroundColor: '#dadada' },
  [theme.breakpoints.down('sm')]: { display: 'none' },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 2),
    width: '100%',
    fontSize: {
      xs: '0.8rem',
      sm: '0.9rem',
      md: '1rem',
      lg: '1.1rem'
    }
  },
}));

const SearchBarComponent = ({ categories, isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    
    if (selectedCategory === 'all') {
      navigate('/');
    } else {
      navigate(`/?category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  const menuProps = {
    PaperProps: {
      style: {
        marginTop: '4px',
        zIndex: 1301
      }
    },
    disableScrollLock: true
  };

  return (
    <SearchBar 
      component="form"
      onSubmit={handleSearch}
      sx={{ 
        display: 'flex', 
        order: isMobile ? 3 : 'initial', 
        flexBasis: isMobile ? '100%' : 'auto' 
      }}
    >
      <CategorySelect
        value={category}
        onChange={handleCategoryChange}
        variant="standard"
        disableUnderline
        MenuProps={menuProps}
      >
        <MenuItem value="all">Tüm Kategoriler</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </CategorySelect>
      <StyledInputBase
        placeholder="Amazing'de Ara"
        inputProps={{ 
          'aria-label': 'search',
          onKeyPress: (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch(e);
            }
          }
        }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SearchIconWrapper onClick={handleSearch}>
        <SearchIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22, lg: 24 } }} />
      </SearchIconWrapper>
    </SearchBar>
  );
};

export default SearchBarComponent; 