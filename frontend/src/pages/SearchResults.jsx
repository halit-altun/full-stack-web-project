import { Container, Box, Pagination, Select, MenuItem, FormControl, InputLabel, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard, { ProductsContainer as BaseProductsContainer } from '../components/Product/ProductCard';
import api from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../contexts/LanguageContext';

// Page container to ensure footer stays at bottom
const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

// Container styling matching HomePage
const StyledContainer = styled(Container)(({ theme }) => ({
  flex: '1',
  marginTop: '20px',
  padding: theme.spacing(2),
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  maxWidth: 'none',
  display: 'flex',
  justifyContent: 'center'
}));

// Rename to StyledProductsContainer and extend from BaseProductsContainer
const StyledProductsContainer = styled(BaseProductsContainer)(({ theme }) => ({
  maxWidth: '1400px',
  margin: '0 auto',
  alignSelf: 'flex-start',
  height: 'fit-content',
  overflow: 'visible',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  }
}));

// Add new styled components from HomePage
const StyledPagination = styled(Pagination)(({ theme }) => ({
  marginTop: 'auto',
  marginBottom: theme.spacing(4),
  display: 'flex',
  justifyContent: 'center',
  '& .MuiPagination-ul': {
    justifyContent: 'center',
  }
}));

const ResultsInfo = styled(Box)(({ theme }) => ({
  color: '#565959',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  marginRight: 'auto'
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1400px',
  width: '100%',
  margin: '0 auto 20px',
  padding: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  borderBottom: '1px solid #ddd'
}));

// Add this component at the top level of the file
const ProductCardSkeleton = () => (
  <Box sx={{ 
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    borderRadius: 1,
    p: 2,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  }}>
    <Skeleton 
      variant="rectangular" 
      width="100%" 
      height={200} 
      sx={{ mb: 1.5, borderRadius: 1 }}
    />
    <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Skeleton variant="rectangular" width={120} height={20} />
      <Skeleton variant="text" width={40} height={20} sx={{ ml: 1 }} />
    </Box>
    <Skeleton variant="text" width="40%" height={32} />
  </Box>
);

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  const [sortBy, setSortBy] = useState('featured');
  const { language } = useLanguage();
  const t = translations[language].searchResults;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/products?search=${searchQuery}`);
        console.log('API Response:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('API Error Details:', error.response || error);
        setError('Ürünler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    } else {
      setProducts([]);
    }
  }, [searchQuery]);

  const getSortedProducts = (products) => {
    switch (sortBy) {
      case 'priceLow':
        return [...products].sort((a, b) => a.price - b.price);
      case 'priceHigh':
        return [...products].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return products;
    }
  };

  const sortedProducts = getSortedProducts(products);
  const currentProducts = sortedProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const firstProductIndex = (page - 1) * productsPerPage + 1;
  const lastProductIndex = Math.min(page * productsPerPage, products.length);

  return (
    <PageContainer>
      <FilterContainer>
        <ResultsInfo>
          {products.length > 0 ? (
            t.showing
              .replace('{first}', firstProductIndex)
              .replace('{last}', lastProductIndex)
              .replace('{total}', products.length)
          ) : searchQuery ? (
            t.noResultsFor.replace('{query}', searchQuery)
          ) : (
            t.pleaseSearch
          )}
        </ResultsInfo>
        
        {products.length > 0 && (
          <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
            <InputLabel>{t.sorting.label}</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label={t.sorting.label}
            >
              <MenuItem value="featured">{t.sorting.featured}</MenuItem>
              <MenuItem value="priceLow">{t.sorting.priceLow}</MenuItem>
              <MenuItem value="priceHigh">{t.sorting.priceHigh}</MenuItem>
              <MenuItem value="newest">{t.sorting.newest}</MenuItem>
            </Select>
          </FormControl>
        )}
      </FilterContainer>

      <StyledContainer maxWidth={false}>
        {loading ? (
          <StyledProductsContainer>
            {[...Array(8)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </StyledProductsContainer>
        ) : products.length > 0 ? (
          <StyledProductsContainer>
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </StyledProductsContainer>
        ) : searchQuery && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8, 
            color: 'text.secondary',
            fontSize: '1.1rem'
          }}>
            <div>{t.noResults}</div>
            <div>{t.tryAgain}</div>
          </Box>
        )}
      </StyledContainer>
      {pageCount > 1 && (
        <StyledPagination 
          count={pageCount} 
          page={page} 
          onChange={handlePageChange}
          color="primary"
        />
      )}
    </PageContainer>
  );
};

export default SearchResults;  