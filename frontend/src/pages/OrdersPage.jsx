import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Divider, 
  CircularProgress,
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

  const handleBuyAgain = (product) => {
    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.image
    }, 1);
    
    toast.success('Ürün sepete eklendi');
    navigate('/cart');
  };

  const addressDisplay = order.deliveryAddress ? (
    <>
      <Typography variant="body2" color="text.secondary">
        {order.deliveryAddress.fullAddress}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {`${order.deliveryAddress.district}, ${order.deliveryAddress.city}`}
      </Typography>
    </>
  ) : (
    <Typography variant="body2" color="text.secondary">
      Teslimat adresi bulunamadı
    </Typography>
  );

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
            SİPARİŞ TARİHİ
          </Typography>
          <Typography variant="body2">
            {new Date(order.createdAt).toLocaleDateString('tr-TR')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            TOPLAM
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            ₺{order.totalAmount}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            SİPARİŞ NO
          </Typography>
          <Typography variant="body2">
            #{order._id}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ bgcolor: 'white' }}>
        {/* Product List */}
        <Box sx={{ mt: 1 }}>
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
                    borderRadius: 1,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
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
                  Ürünü Tekrar Al
                </StyledButton>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Delivery Address */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Teslimat Adresi:
          </Typography>
          {addressDisplay}
        </Box>
      </CardContent>
    </Card>
  );
};

// Add wave animation keyframes
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

// Add loading skeleton component
const OrderSkeleton = () => (
  <Box sx={{ mb: 2 }}>
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Skeleton 
            variant="rectangular" 
            width={120} 
            height={24} 
            sx={{
              bgcolor: '#f0f0f0',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: `${waveAnimation} 1.5s infinite`,
              }
            }}
          />
          <Skeleton 
            variant="rectangular" 
            width={100} 
            height={24}
            sx={{
              bgcolor: '#f0f0f0',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: `${waveAnimation} 1.5s infinite`,
              }
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          {[1, 2].map((item) => (
            <Box key={item} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Skeleton 
                variant="rectangular" 
                width={60} 
                height={60} 
                sx={{ 
                  mr: 2,
                  bgcolor: '#f0f0f0',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: `${waveAnimation} 1.5s infinite`,
                  }
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton 
                  variant="text" 
                  width="80%" 
                  sx={{
                    bgcolor: '#f0f0f0',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      animation: `${waveAnimation} 1.5s infinite`,
                    }
                  }}
                />
                <Skeleton 
                  variant="text" 
                  width="40%" 
                  sx={{
                    bgcolor: '#f0f0f0',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      animation: `${waveAnimation} 1.5s infinite`,
                    }
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  </Box>
);

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

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
        {loading ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 3 }}>
              <Skeleton 
                variant="rectangular" 
                width={150} 
                height={32}
                sx={{
                  bgcolor: '#f0f0f0',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: `${waveAnimation} 1.5s infinite`,
                  }
                }}
              />
            </Box>
            {[1, 2, 3].map((item) => (
              <OrderSkeleton key={item} />
            ))}
          </>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {error}
            </Typography>
            <StyledButton
              component={Link}
              to="/"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Anasayfaya Dön
            </StyledButton>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 3 }}>
              <Typography variant="h5" sx={{ color: '#0F1111' }}>
                Siparişlerim
              </Typography>
              {orders.length > 0 && (
                <Typography variant="body2" sx={{ color: '#565959' }}>
                  {orders.length} sipariş | Gösterilen: {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, orders.length)}
                </Typography>
              )}
            </Box>

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
                        İlk Sayfa
                      </StyledButton>

                      <StyledButton
                        variant="outlined"
                        className="outlined"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        size="small"
                        sx={{ minWidth: 'auto', px: 1 }}
                      >
                        Önceki Sayfa
                      </StyledButton>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        px: 1,
                        color: '#0F1111',
                        fontSize: '0.875rem'
                      }}>
                        Sayfa {currentPage} / {totalPages}
                      </Box>

                      <StyledButton
                        variant="outlined"
                        className="outlined"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        size="small"
                        sx={{ minWidth: 'auto', px: 1 }}
                      >
                        Sonraki Sayfa
                      </StyledButton>

                      <StyledButton
                        variant="outlined"
                        className="outlined"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        Son Sayfa
                      </StyledButton>
                    </Stack>
                  </PaginationContainer>
                )}
              </>
            )}
          </>
        )}
      </StyledContainer>
    </PageContainer>
  );
};

export default OrdersPage;
