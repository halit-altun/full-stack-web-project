import { useParams } from 'react-router-dom';
import { Box, Typography, Rating, Button, Divider, Modal, TextField, Alert, Collapse, Skeleton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../components/Common/StyledButton';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../contexts/LanguageContext';

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

const ProductDetailSkeleton = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '20px 40px',
  gap: '30px',
  maxWidth: '1500px',
  margin: '0 auto',
  [theme.breakpoints.down('lg')]: {
    padding: '20px',
    gap: '20px',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: '10px',
    gap: '15px',
  },
  '& .MuiSkeleton-root': {
    '&::after': {
      animation: `${waveAnimation} 1.6s linear 0.5s infinite`,
    }
  }
}));

const ProductContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '20px 40px',
  gap: '30px',
  maxWidth: '1500px',
  margin: '0 auto',
  flex: '1',
  [theme.breakpoints.down('lg')]: {
    padding: '20px',
    gap: '20px',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: '10px',
    gap: '15px',
    width: '100%',
  }
}));

const ImageSection = styled(Box)(({ theme }) => ({
  flex: '0 0 500px',
  display: 'flex',
  position: 'relative',
  aspectRatio: '1/1',
  maxHeight: '500px',
  width: '500px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  overflow: 'visible',
  border: '1px solid #ddd',
  [theme.breakpoints.down('lg')]: {
    flex: '0 0 400px',
    width: '400px',
  },
  [theme.breakpoints.down('md')]: {
    flex: '1',
    width: '100%',
    maxWidth: '100%',
    maxHeight: '400px',
  }
}));

const DetailSection = styled(Box)(({ theme }) => ({
  flex: '1',
  padding: '0 20px',
  minWidth: '0',
  [theme.breakpoints.down('md')]: {
    padding: '0 10px',
    order: 1,
    width: '100%',
  }
}));

const PurchaseSection = styled(Box)(({ theme }) => ({
  flex: '0 0 350px',
  maxWidth: '350px',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#fff',
  alignSelf: 'flex-start',
  [theme.breakpoints.down('lg')]: {
    flex: '0 0 300px',
    maxWidth: '300px',
  },
  [theme.breakpoints.down('md')]: {
    order: 2,
    width: '100%',
    maxWidth: '100%',
    padding: '15px',
    marginBottom: '15px',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'sticky',
    top: '0',
    zIndex: 1,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  }
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginTop: '10px',
  backgroundColor: '#ffd814',
  color: '#111',
  '&:hover': {
    backgroundColor: '#f7ca00',
  }
}));

const BuyNowButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginTop: '10px',
  backgroundColor: '#ffa41c',
  color: '#111',
  '&:hover': {
    backgroundColor: '#fa8900',
  }
}));

const AddressModal = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  '& .MuiTextField-root': {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#e77600',
      },
      '&:hover fieldset': {
        borderColor: '#e77600',
      }
    }
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  }
}));

const ZoomContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: '100%',
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '12px',
  marginLeft: '20px',
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.2s, visibility 0.2s',
  zIndex: 100,
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const PageWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const categoryMapping = {
  'Elektronik': 'electronics',
  'Ev & Yaşam': 'homeAndLiving',
  'Moda': 'fashion',
  'Mutfak': 'kitchen',
  'Oyun & Hobi': 'gamesAndHobbies'
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [postalCode, setPostalCode] = useState(() => {
    return localStorage.getItem('deliveryPostalCode') || '';
  });
  const [error, setError] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const [alertMessage, setAlertMessage] = useState('');
  
  // Get current quantity from cart
  const currentCartItem = cartItems.find(item => item?.id === product?.id);
  const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (!id) {
          console.error('Ürün ID\'si bulunamadı');
          return;
        }
        
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Ürün bulunamadı');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Ürün yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handlePostalCodeChange = (event) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 5);
    setPostalCode(value);
    
    if (value.length === 5) {
      setError('');
      localStorage.setItem('deliveryPostalCode', value);
    } else if (value.length > 0) {
      setError('Posta kodu 5 haneli olmalıdır');
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    setMousePosition({ x, y });
  };

  const handleAddToCart = () => {
    if (currentQuantity + quantity <= product.count) {
      addToCart(product, quantity);
    } else {
      setAlertMessage(t.productDetail.alert.maxQuantity
        .replace('{max}', product.count)
        .replace('{current}', currentQuantity));
      setAlertOpen(true);
      setTimeout(() => setAlertOpen(false), 5000);
    }
  };

  const handleBuyNow = () => {
    if (currentQuantity + quantity <= product.count) {
      addToCart(product, quantity);
      navigate('/cart');
    } else {
      setAlertMessage(t.productDetail.alert.maxQuantity
        .replace('{max}', product.count)
        .replace('{current}', currentQuantity));
      setAlertOpen(true);
      setTimeout(() => setAlertOpen(false), 5000);
    }
  };

  const handleModalClose = () => {
    if (postalCode.length === 5) {
      localStorage.setItem('deliveryPostalCode', postalCode);
    }
    setOpenModal(false);
  };

  if (loading) {
    return (
      <ProductDetailSkeleton>
        <Box sx={{ flex: '0 0 500px' }}>
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height="500px"
            sx={{ borderRadius: '12px' }}
          />
        </Box>

        <Box sx={{ flex: 1, padding: '0 20px' }}>
          <Skeleton variant="text" width="70%" height={40} />
          <Box sx={{ my: 2 }}>
            <Skeleton variant="text" width="30%" />
          </Box>
          <Skeleton variant="text" width="20%" height={40} />
          <Box sx={{ my: 3 }}>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
          </Box>
        </Box>

        <Box sx={{ flex: '0 0 350px' }}>
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '8px' }} />
        </Box>
      </ProductDetailSkeleton>
    );
  }

  if (!product) {
    return <Typography>Ürün bulunamadı.</Typography>;
  }

  return (
    <PageWrapper>
      <ProductContainer>
        <Collapse in={alertOpen}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setAlertOpen(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{
              position: 'fixed',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              width: 'auto',
              maxWidth: '90%',
              minWidth: '300px',
              mt: 2,
              backgroundColor: '#fff',
              border: '1px solid #c40000',
              color: '#c40000',
              '& .MuiAlert-icon': {
                color: '#c40000',
              },
              '& .MuiAlert-message': {
                padding: '8px 0',
                fontSize: '14px',
              },
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            }}
          >
            {alertMessage}
          </Alert>
        </Collapse>
        
        <ImageSection>
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              cursor: 'crosshair',
              maxHeight: { xs: '300px', sm: '400px', md: '500px' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img 
              src={product.image} 
              alt={product.title}
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '12px',
                maxHeight: '100%'
              }} 
            />
            <ZoomContainer
              sx={{
                opacity: isHovering ? 1 : 0,
                visibility: isHovering ? 'visible' : 'hidden',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.title}
                  style={{ 
                    position: 'absolute',
                    width: '200%',
                    height: '200%',
                    objectFit: 'contain',
                    transform: `translate(${-mousePosition.x + 25}%, ${-mousePosition.y + 25}%)`,
                    pointerEvents: 'none',
                    borderRadius: '12px',
                  }} 
                />
              </Box>
            </ZoomContainer>
          </Box>
        </ImageSection>

        <DetailSection>
          <Typography 
            variant="h4" 
            gutterBottom
            color="#000000" 
            sx={{ 
              fontWeight: 400,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            {product.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating 
              value={product.rating} 
              precision={0.5} 
              readOnly 
              sx={{ color: '#f39c12' }}
            />
            <Typography variant="body2" sx={{ ml: 1, color: '#007185' }}>
              {product.rating} {t.productDetail.rating}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" color="error" gutterBottom>
            ₺{product.price}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="subtitle1" 
              color="success.main"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1  
              }}
            >
              <LocalShippingIcon />
              {t.productDetail.fastDelivery}
            </Typography>
          </Box>

          <Typography variant="body1" paragraph sx={{ color: '#000000' }}>
            {product.description}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {t.productDetail.category}: {t.categories[categoryMapping[product.category]]}
          </Typography>
        </DetailSection>

        <PurchaseSection>
          <Typography variant="h5" sx={{ color: '#0F1111', display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontSize: '14px', marginRight: '2px' }}>₺</span>
            {Math.floor(product.price)}
            <span style={{ fontSize: '14px' }}>
              {(product.price % 1).toFixed(2).substring(1)}
            </span>
          </Typography>

          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="body2" color="success.main">
              {t.productDetail.freeShipping}
            </Typography>
            <Typography variant="body2" sx={{ color: '#565959', fontSize: '14px', mt: 0.5 }}>
              {t.productDetail.nextDayDelivery}
            </Typography>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              mb: 2, 
              p: 1, 
              border: '1px solid #ddd', 
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#F7FAFA'
              }
            }}
            onClick={() => setOpenModal(true)}
          >
            <LocationOnIcon sx={{ color: '#565959', fontSize: 20 }} />
            <Box>
              <Typography variant="body2" sx={{ color: '#565959' }}>
                {t.productDetail.selectDeliveryAddress}
              </Typography>
              {postalCode.length === 5 && (
                <Typography variant="body2" sx={{ color: '#0F1111', fontWeight: 500 }}>
                  {postalCode}
                </Typography>
              )}
            </Box>
          </Box>

          <Typography variant="h6" sx={{ color: '#000000' }}>
            {t.productDetail.inStock}
          </Typography>

          <Typography variant="body2" sx={{ color: '#000000' }}>
            {t.productDetail.seller}: <span style={{ color: '#007185' }}>Amazing</span>
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              {t.productDetail.quantity}:
            </Typography>
            <select 
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#F0F2F2',
                color: '#000000'
              }}
            >
              {[...Array(Math.min(product.count, 30))].map((_, index) => (
                <option key={index + 1} value={index + 1}>{index + 1}</option>
              ))}
            </select>
          </Box>

          <AddToCartButton 
            variant="contained" 
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            sx={{
              fontSize: '14px',
              py: 1,
              borderRadius: '20px',
              textTransform: 'none',
              boxShadow: 'none'
            }}
          >
            {t.productDetail.addToCart}
          </AddToCartButton>

          <BuyNowButton 
            variant="contained"
            onClick={handleBuyNow}
            sx={{
              fontSize: '14px',
              py: 1,
              borderRadius: '20px',
              textTransform: 'none',
              boxShadow: 'none'
            }}
          >
            {t.productDetail.buyNow}
          </BuyNowButton>
        </PurchaseSection>

        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="address-modal-title"
        >
          <AddressModal>
            <Typography 
              id="address-modal-title" 
              variant="h6" 
              component="h2" 
              gutterBottom
              sx={{ 
                color: '#0F1111',
                fontSize: '18px',
                fontWeight: 700 
              }}
            >
              {t.productDetail.modal.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#565959',
                mb: 2
              }}
            >
              {t.productDetail.modal.subtitle}
            </Typography>
            <TextField
              fullWidth
              label={t.productDetail.modal.postalCode}
              value={postalCode}
              onChange={handlePostalCodeChange}
              error={!!error}
              helperText={error}
              sx={{ 
                mt: 1,
                '& .MuiFormLabel-root.Mui-focused': {
                  color: '#e77600'
                }
              }}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
            />
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <StyledButton
                onClick={handleModalClose}
                variant="outlined"
                className="outlined"
              >
                {t.productDetail.modal.cancel}
              </StyledButton>
              <StyledButton
                onClick={handleModalClose}
                variant="contained"
                disabled={postalCode.length !== 5}
              >
                {t.productDetail.modal.confirm}
              </StyledButton>
            </Box>
          </AddressModal>
        </Modal>
      </ProductContainer>
    </PageWrapper>
  );
};

export default ProductDetail;
