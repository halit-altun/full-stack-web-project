import { Box, Typography, Divider, Grid, DialogTitle, DialogContent, DialogActions, Skeleton } from '@mui/material';

import { useCart } from '../contexts/CartContext';
import { Link, useNavigate, Link as RouterLink } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useOrders } from '../contexts/OrderContext';
import { useAddresses } from '../contexts/AddressContext';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import addressService from '../services/addressService';
import { useSelector } from 'react-redux';
import StyledButton from '../components/Common/StyledButton';
import AnimatedCheckmark from '../components/Common/AnimatedCheckmark';
import { 
  StyledComponents, 
  PageContainer, 
  StyledContainer, 
  StyledDialog 
} from '../styles/CartPageStyles';
import DeliveryAddress from '../components/Cart/DeliveryAddress';
import CheckoutSummary from '../components/Cart/CheckoutSummary';
import { useLanguage, translations } from '../contexts/LanguageContext';

const CartItemSkeleton = () => (
  <Box sx={{ my: 3 }}>
    <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="flex-start">
      <Grid item xs={4} sm={2}>
        <Skeleton variant="rectangular" sx={{ paddingTop: '100%', borderRadius: '8px' }} />
      </Grid>
      <Grid item xs={8} sm={8}>
        <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 1, width: '80%' }} />
        <Skeleton variant="text" sx={{ fontSize: '0.875rem', mb: 1, width: '30%' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant="rectangular" width={40} height={32} />
          <Skeleton variant="rectangular" width={40} height={32} />
          <Skeleton variant="rectangular" width={40} height={32} />
          <Skeleton variant="rectangular" width={80} height={32} sx={{ ml: 2 }} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={2} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
        <Skeleton variant="text" sx={{ fontSize: '1.25rem', width: '100%' }} />
      </Grid>
    </Grid>
    <Divider sx={{ mt: 2 }} />
  </Box>
);

const CartPage = () => {
  const { cartItems, getCartCount, getCartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { addresses, setAddresses } = useAddresses();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const cartCount = getCartCount();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = user !== null;
  const [cartLoading, setCartLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language].cart;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await addressService.getAddresses();
        setAddresses(response.addresses);
      } catch (error) {
        toast.error('Adresler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCartLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (productId, change) => {
    const item = cartItems.find(item => item._id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1 && newQuantity <= item.count) {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  const handleQuantityInputChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    const item = cartItems.find(item => item._id === productId);
    
    if (item && !isNaN(newQuantity)) {
      if (newQuantity >= 1 && newQuantity <= item.count) {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  const handleCheckoutClick = async () => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsLoading(false);
    setOpenConfirmDialog(true);
  };

  const handleConfirmCheckout = async () => {
    setOpenConfirmDialog(false);
    try {
      const orderResult = await addOrder(cartItems, getCartTotal(), selectedAddress);
      
      if (orderResult) {
        navigate('/orders');
        
        setTimeout(() => {
          clearCart();
          toast.success('Siparişiniz başarıyla oluşturuldu!');
        }, 100);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Sipariş oluşturulurken bir hata oluştu');
    }
  };

  if (cartCount === 0) {
    return (
      <PageContainer sx={{ minHeight: '84vh' }}>
        <StyledContainer
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            height: 'calc(100vh - 300px)'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#0F1111',
              textAlign: 'center'
            }}
          >
            {t.emptyCart}
          </Typography>
          <StyledButton
            component={Link}
            to="/"
            variant="contained"
          >
            {t.continueShopping}
          </StyledButton>
        </StyledContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <StyledContainer>
        <Box sx={{ 
          maxWidth: '100%',
          overflow: 'hidden',
          px: { xs: 1, sm: 2, md: 3 }
        }}>
          <DeliveryAddress 
            isAuthenticated={isAuthenticated}
            loading={loading}
            addresses={addresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            user={user}
          />
          <Grid 
            container 
            spacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ maxWidth: '100%' }}
          >
            <Grid item xs={12} lg={9}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  color: '#0F1111', 
                  fontWeight: 500,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                }}
              >
                {t.pageTitle}
              </Typography>
              <Typography 
                variant="body2" 
                align="right" 
                sx={{ color: '#565959', mb: 1 }}
              >
                Fiyat
              </Typography>
              <Divider />

              <Box sx={{ overflowX: 'hidden', '& img': { maxWidth: '100%', height: 'auto' }}}>
                {cartLoading ? (
                  [...Array(3)].map((_, index) => (
                    <CartItemSkeleton key={index} />
                  ))
                ) : (
                  cartItems.map((item) => (
                    <Box key={item.id} sx={{ 
                      my: 3,
                      maxWidth: '100%',
                      overflow: 'hidden'
                    }}>
                      <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="flex-start">
                        <Grid item xs={4} sm={2}>
                          <Box sx={{ 
                            width: '100%',
                            position: 'relative',
                            paddingTop: '100%'
                          }}>
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: '8px',
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={8} sm={8}>
                          <Link to={`/product/${item._id}`}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                color: '#0F1111',
                                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                              }}
                            >
                              {item.title}
                            </Typography>
                          </Link>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#007600',
                              mb: 1,
                              fontWeight: 500
                            }}
                          >
                            Stokta var
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <StyledComponents.QuantityButton
                              onClick={() => handleQuantityChange(item._id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <RemoveIcon />
                            </StyledComponents.QuantityButton>
                            
                            <StyledComponents.QuantityInput
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityInputChange(item._id, e)}
                              inputProps={{
                                min: 1,
                                max: item.count,
                                'aria-label': 'quantity',
                              }}
                              variant="outlined"
                              size="small"
                            />
                            
                            <StyledComponents.QuantityButton
                              onClick={() => handleQuantityChange(item._id, 1)}
                              disabled={item.quantity >= item.count}
                            >
                              <AddIcon />
                            </StyledComponents.QuantityButton>
                            <Divider orientation="vertical" flexItem />
                            <StyledComponents.DeleteButton
                              onClick={() => removeFromCart(item._id)}
                              startIcon={<DeleteOutlineIcon />}
                            >
                              Sil
                            </StyledComponents.DeleteButton>
                          </Box>
                        </Grid>
                        <Grid 
                          item 
                          xs={12} 
                          sm={2}
                          sx={{
                            textAlign: { xs: 'left', sm: 'right' },
                            mt: { xs: 1, sm: 0 }
                          }}
                        >
                          <Typography variant="h6" sx={{ color: '#0F1111', fontWeight: 700 }}>
                            ₺{(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider sx={{ mt: 2 }} />
                    </Box>
                  ))
                )}
              </Box>
            </Grid>

            <Grid 
              item 
              xs={12} 
              lg={3}
              sx={{
                position: { lg: 'sticky' },
                top: { lg: '20px' },
                alignSelf: { lg: 'flex-start' }
              }}
            >
              <CheckoutSummary 
                cartCount={cartCount}
                getCartTotal={getCartTotal}
                selectedAddress={selectedAddress}
                isLoading={isLoading}
                handleCheckoutClick={handleCheckoutClick}
              />
            </Grid>
          </Grid>
        </Box>
      </StyledContainer>
      <StyledDialog
        open={openConfirmDialog}
        onClose={handleConfirmCheckout}
        aria-labelledby="confirm-dialog-title"
        disableEscapeKeyDown={false}
      >
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <AnimatedCheckmark />
          <DialogTitle id="confirm-dialog-title" sx={{ pb: 2 }}>
            {"Siparişiniz Alındı"}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Toplam Tutar: ₺{getCartTotal().toFixed(2)}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
            <StyledButton
              onClick={handleConfirmCheckout}
              variant="contained"
              autoFocus
            >
              Tamam
            </StyledButton>
          </DialogActions>
        </Box>
      </StyledDialog>
    </PageContainer>
  );
};

export default CartPage;
