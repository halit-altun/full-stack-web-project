import { Box, Typography, Button, Grow, Divider, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCart } from '../../contexts/CartContext';
import { useTheme, useMediaQuery } from '@mui/material';

const StyledComponents = {
  CartPopover: styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    width: 320,
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    '& .empty-cart-message': {
      textAlign: 'center',
      padding: theme.spacing(2),
    },
    '& .cart-button': {
      width: '100%',
      marginTop: theme.spacing(1),
      backgroundColor: '#FFD814',
      color: '#0F1111',
      '&:hover': {
        backgroundColor: '#F7CA00',
      },
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '14px',
      borderRadius: '8px',
      boxShadow: 'none',
      padding: '8px 10px'
    },
  })),

  CartItemQuantityButton: styled(Button)(({ theme }) => ({
    padding: 4,
    border: '1px solid #D5D9D9',
    borderRadius: 4,
    backgroundColor: '#F0F2F2',
    minWidth: 'unset',
    '&:hover': {
      backgroundColor: '#E3E6E6',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '16px',
    },
  })),

  CartItemTitle: styled(Link)(({ theme }) => ({
    color: '#007185',
    textDecoration: 'none',
    fontSize: '14px',
    '&:hover': {
      color: '#C7511F',
      textDecoration: 'none',
    },
  })),

  DeleteButton: styled(Button)(({ theme }) => ({
    padding: 4,
    color: '#007185',
    minWidth: 'unset',
    '&:hover': {
      color: '#C7511F',
      backgroundColor: 'transparent',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '18px',
    },
  })),

  QuantityInput: styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
      padding: '2px 4px',
      width: '40px',
      textAlign: 'center',
      fontSize: '14px',
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        display: 'none',
      },
    },
    '& .MuiOutlinedInput-root': {
      height: '28px',
    },
  })),
};

const CartSummary = ({ onClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { cartItems, getCartCount, getCartTotal, updateQuantity, removeFromCart } = useCart();
  const cartCount = getCartCount();

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find(i => i._id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0 && (!item.count || newQuantity <= item.count)) {
        updateQuantity(itemId, newQuantity);
      }
    }
  };

  const handleQuantityInputChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value) || 0;
    const item = cartItems.find(i => i._id === itemId);
    
    if (item && newQuantity >= 0 && newQuantity <= item.count) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCartClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/cart');
    if (onClose) onClose();
  };

  return (
    <Grow in>
      <StyledComponents.CartPopover>
        {cartCount === 0 ? (
          <div className="empty-cart-message">
            <Typography variant="body1" gutterBottom sx={{ color: '#000' }}>
              Sepetiniz boş
            </Typography>
            <Button
              variant="contained"
              className="cart-button"
              component={Link}
              to="/"
              onClick={onClose}
            >
              Alışverişe Başla
            </Button>
          </div>
        ) : (
          <div>
            {/* Cart content */}
            <Typography variant="h6" gutterBottom sx={{ 
              fontSize: '16px', 
              fontWeight: 700,
              color: '#0F1111',
              borderBottom: '1px solid #DDD',
              pb: 1
            }}>
              Alışveriş Sepeti
            </Typography>
            
            {/* Cart items */}
            <Box sx={{ 
              maxHeight: 350, 
              overflowY: 'auto', 
              mb: 2,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '4px',
                '&:hover': {
                  background: '#555',
                },
              },
            }}>
              {cartItems.map((item) => (
                <Box key={item._id} sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  mb: 2, 
                  pb: 2,
                  borderBottom: '1px solid #DDD',
                  '&:last-child': {
                    borderBottom: 'none',
                    pb: 0,
                  }
                }}>
                  <Box sx={{ width: 60, height: 60 }}>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <StyledComponents.CartItemTitle 
                      to={`/product/${item._id}`}
                      onClick={onClose}
                    >
                      {item.title}
                    </StyledComponents.CartItemTitle>
                    <Typography variant="body2" color="error" sx={{ 
                      fontSize: '14px',
                      fontWeight: 700,
                      mt: 0.5 
                    }}>
                      ₺{item.price}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mt: 1,
                      gap: 1
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        border: '1px solid #D5D9D9',
                        borderRadius: '4px',
                        backgroundColor: '#F0F2F2'
                      }}>
                        <StyledComponents.CartItemQuantityButton
                          onClick={() => handleQuantityChange(item._id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </StyledComponents.CartItemQuantityButton>
                        
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
                        
                        <StyledComponents.CartItemQuantityButton
                          onClick={() => handleQuantityChange(item._id, 1)}
                          disabled={item.count && item.quantity >= item.count}
                        >
                          <AddIcon />
                        </StyledComponents.CartItemQuantityButton>
                      </Box>
                      <StyledComponents.DeleteButton
                        onClick={() => removeFromCart(item._id)}
                        aria-label="delete item"
                      >
                        <DeleteOutlineIcon />
                      </StyledComponents.DeleteButton>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            
            {/* Cart summary */}
            <Divider />
            <Box sx={{ 
              mt: 2, 
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="body1" sx={{ 
                fontSize: '16px',
                fontWeight: 700,
                color: '#0F1111'
              }}>
                Ara Toplam ({cartCount} ürün):
              </Typography>
              <Typography variant="body1" sx={{ 
                fontSize: '18px',
                fontWeight: 700,
                color: '#B12704'
              }}>
                ₺{getCartTotal().toFixed(2)}
              </Typography>
            </Box>
            
            {/* Cart button */}
            <Button
              variant="contained"
              className="cart-button"
              component={Link}
              to="/cart"
              onClick={onClose}
              sx={{
                width: '100%',
                backgroundColor: '#FFD814',
                color: '#0F1111',
                '&:hover': {
                  backgroundColor: '#F7CA00',
                },
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                borderRadius: '8px',
                boxShadow: 'none',
              }}
            >
              Sepete Git
            </Button>
          </div>
        )}
      </StyledComponents.CartPopover>
    </Grow>
  );
};

export default CartSummary;
