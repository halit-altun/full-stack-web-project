import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Box,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Divider
} from '@mui/material';
import { products } from '../../../backend/models/products';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import productsData from '../../data/products.json';
const { products } = productsData;

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
  },
}));

const ProductLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const ProductSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/products?search=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Arama sonuçları getirilirken hata oluştu:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 6 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {searchResults.length > 0 
          ? `"${searchQuery}" için ${searchResults.length} sonuç bulundu`
          : `"${searchQuery}" için sonuç bulunamadı`}
      </Typography>
      
      {searchResults.length > 0 ? (
        <Grid container spacing={3}>
          {searchResults.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductLink to={`/product/${product._id}`}>
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.title}
                    sx={{ objectFit: 'contain', p: 2 }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                      {product.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={product.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.rating})
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      {`₺${product.price}`}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </ProductLink>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          backgroundColor: '#fff',
          borderRadius: 1,
          boxShadow: 1
        }}>
          <Typography variant="h6" color="text.secondary">
            Aramanızla eşleşen ürün bulunamadı.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Lütfen farklı bir arama terimi deneyin.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ProductSearch;
