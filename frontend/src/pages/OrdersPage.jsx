import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Divider, 
  Grid,
  Card,
  CardContent,
  Stack,
  Skeleton,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import StyledButton from '../components/Common/StyledButton';
import { useLanguage, translations } from '../contexts/LanguageContext';

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  flex: '1',
  maxWidth: '1500px',
  padding: theme.spacing(3),
  minHeight: 'calc(100vh - 200px)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  paddingBottom: '80px',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    paddingBottom: '80px',
  }
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  backgroundColor: '#fff',
  borderTop: '1px solid #eee',
}));

const OrderCard = ({ order }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language].dashboard.orders;

  const handleBuyAgain = (product) => {
    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.image
    }, 1);
    
    toast.success(translations[language].cart.addedToCart);
    navigate('/cart');
  };

  const addressDisplay = order.deliveryAddress ? (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        {t.deliveryAddress}:
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {order.deliveryAddress.fullAddress}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {`${order.deliveryAddress.district}, ${order.deliveryAddress.city}`}
      </Typography>
    </Box>
  ) : null;

  return (
    <Card sx={{ 
      mb: 2, 
      border: '1px solid #DDD',
      borderRadius: '8px',
      boxShadow: 'none'
    }}>
      <Box sx={{ 
        bgcolor: '#F0F2F2', 
        p: 2,
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        borderBottom: '1px solid #DDD',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t.totalAmount}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {language === 'tr' ? '₺' : '$'}{order.totalAmount}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t.orderNumber}
          </Typography>
          <Typography variant="body2">
            #{order._id}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ bgcolor: 'white' }}>
        {order.products.map((item) => (
          <Box 
            key={item.product._id}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
              pb: 2,
              borderBottom: '1px solid #eee',
              '&:last-child': {
                borderBottom: 'none',
                pb: 0,
                mb: 0
              }
            }}
          >
            <Link to={`/product/${item.product._id}`}>
              <Box
                component="img"
                src={item.product.image}
                alt={item.product.title}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: 'contain',
                  borderRadius: 1
                }}
              />
            </Link>
            <Box sx={{ flex: 1 }}>
              <Link 
                to={`/product/${item.product._id}`}
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit'
                }}
              >
                <Typography 
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    '&:hover': {
                      color: '#C7511F',
                      textDecoration: 'none'
                    }
                  }}
                >
                  {item.product.title}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary">
                Adet: {item.quantity}
              </Typography>
              <Typography variant="body2" sx={{ color: '#B12704', fontWeight: 500 }}>
                ₺{item.product.price}
              </Typography>
              <StyledButton
                variant="outlined"
                size="small"
                onClick={() => handleBuyAgain(item.product)}
                className="outlined"
                sx={{ mt: 1 }}
              >
                {t.buyAgain}
              </StyledButton>
            </Box>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 2 }}>
          {addressDisplay}
        </Box>
      </CardContent>
    </Card>
  );
};

// wave animation keyframes
const waveAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// loading skeleton container
const LoadingContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  '& .MuiSkeleton-root': {
    transform: 'scale(1, 0.8)',
    '&::after': {
      animation: `${waveAnimation} 1.6s linear 0.5s infinite`,
      background: `linear-gradient(90deg, transparent, ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.6)'}, transparent)`,
    }
  }
}));

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const { language } = useLanguage();
  const t = translations[language].dashboard.orders;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/users/orders');
        if (response.data.success) {
          setOrders(response.data.orders);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Siparişler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchOrders();
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Calculate orders to display on current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Page change function
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  return (
    <PageContainer>
      <StyledContainer>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ color: '#0F1111' }}
          >
            {t.title}
          </Typography>

          {loading ? (
            <LoadingContainer>
              {[...Array(3)].map((_, index) => (
                <Card key={index} sx={{ mb: 2, p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Skeleton variant="rectangular" height={120} animation="wave" />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Stack spacing={1}>
                        <Skeleton variant="text" width="60%" height={30} animation="wave" />
                        <Skeleton variant="text" width="40%" animation="wave" />
                        <Skeleton variant="text" width="30%" animation="wave" />
                        <Skeleton variant="text" width="20%" animation="wave" />
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </LoadingContainer>
          ) : error ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="error">
                {t.error}
              </Typography>
            </Box>
          ) : orders.length === 0 ? (
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              backgroundColor: '#fff',
              borderRadius: 1,
              boxShadow: 1
            }}>
              <Typography variant="h6" color="text.secondary">
                {t.noOrders}
              </Typography>
              <StyledButton
                component={Link}
                to="/"
                variant="contained"
                sx={{ mt: 2 }}
              >
                {t.startShopping}
              </StyledButton>
            </Box>
          ) : (
            <>
              {orders.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Henüz siparişiniz bulunmuyor
                  </Typography>
                  <StyledButton
                    component={Link}
                    to="/"
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    Alışverişe Başla
                  </StyledButton>
                </Box>
              ) : (
                <>
                  {currentOrders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                  ))}

                  {/* Pagination Buttons */}
                  {totalPages > 1 && (
                    <PaginationContainer>
                      <Stack 
                        direction="row" 
                        spacing={1} 
                        justifyContent="center" 
                        mt={4}
                      >
                        <StyledButton
                          variant="outlined"
                          className="outlined"
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                          size="small"
                          sx={{ minWidth: 'auto', px: 1 }}
                        >
                          {t.firstPage}
                        </StyledButton>

                        <StyledButton
                          variant="outlined"
                          className="outlined"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          size="small"
                          sx={{ minWidth: 'auto', px: 1 }}
                        >
                          {t.previousPage}
                        </StyledButton>
                        
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          px: 1,
                          color: '#0F1111',
                          fontSize: '0.875rem'
                        }}>
                          {t.pageInfo.replace('{current}', currentPage).replace('{total}', totalPages)}
                        </Box>

                        <StyledButton
                          variant="outlined"
                          className="outlined"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          size="small"
                          sx={{ minWidth: 'auto', px: 1 }}
                        >
                          {t.nextPage}
                        </StyledButton>

                        <StyledButton
                          variant="outlined"
                          className="outlined"
                          onClick={() => handlePageChange(totalPages)}
                          disabled={currentPage === totalPages}
                        >
                          {t.lastPage}
                        </StyledButton>
                      </Stack>
                    </PaginationContainer>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </StyledContainer>
    </PageContainer>
  );
};

export default OrdersPage;
