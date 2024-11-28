import { Container, Box, Pagination, Select, MenuItem, FormControl, InputLabel, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard, { ProductsContainer } from '../components/Product/ProductCard';
import api from '../services/api';

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

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

const StyledProductsContainer = styled(ProductsContainer)(({ theme }) => ({
  maxWidth: '1400px',
  margin: '0 auto',
  alignSelf: 'flex-start',
  height: 'fit-content',
  overflow: 'visible',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  }
}));

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

const SkeletonCard = () => (
  <Box sx={{ width: '100%', height: '100%' }}>
    <Skeleton variant="rectangular" height={200} animation="wave" />
    <Box sx={{ pt: 1 }}>
      <Skeleton animation="wave" height={20} width="60%" />
      <Skeleton animation="wave" height={20} width="80%" sx={{ mt: 1 }} />
      <Skeleton animation="wave" height={30} width="40%" sx={{ mt: 1 }} />
    </Box>
  </Box>
);

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/products');
        console.log('API Response:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('API Error Details:', error.response || error);
        setError('Ürünler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add sorting function
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

  // Modify the filtering and sorting pipeline
  const filteredProducts = selectedCategory && selectedCategory !== 'hepsi'
    ? products.filter(product => product.category === selectedCategory)
    : products;
  
  const sortedProducts = getSortedProducts(filteredProducts);
  
  const currentProducts = sortedProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate first and last product indexes on current page
  const firstProductIndex = (page - 1) * productsPerPage + 1;
  const lastProductIndex = Math.min(page * productsPerPage, filteredProducts.length);

  return (
    <PageContainer>
      <FilterContainer>
        <ResultsInfo>
          {filteredProducts.length > 0 ? (
            `${firstProductIndex}-${lastProductIndex} arası ${filteredProducts.length} sonuç`
          ) : (
            'Sonuç bulunamadı'
          )}
        </ResultsInfo>
        
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Sırala</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sırala"
          >
            <MenuItem value="featured">Öne Çıkan</MenuItem>
            <MenuItem value="priceLow">Fiyat: Düşükten Yükseğe</MenuItem>
            <MenuItem value="priceHigh">Fiyat: Yüksekten Düşüğe</MenuItem>
            <MenuItem value="newest">En Yeni Gelenler</MenuItem>
          </Select>
        </FormControl>
      </FilterContainer>

      <StyledContainer maxWidth={false}>
        <StyledProductsContainer>
          {loading ? (
            // Show 12 skeleton cards in loading state
            [...Array(productsPerPage)].map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </StyledProductsContainer>
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

export default HomePage;