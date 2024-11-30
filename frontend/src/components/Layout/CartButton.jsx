import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Badge,
  Typography,
  Box,
  Popper,
  Grow,
  ClickAwayListener
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';
import CartSummary from '../Cart/CartItem';
import { StyledComponents } from './styles/NavbarStyles';
import { useTheme, useMediaQuery } from '@mui/material';
import { useLanguage } from '../../contexts/LanguageContext';

const CartButton = () => {
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { language } = useLanguage();
  const navigate = useNavigate();

  const translations = {
    tr: {
      cart: 'Sepet'
    },
    en: {
      cart: 'Cart'
    }
  };

  const handleCartMouseEnter = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartMouseLeave = () => {
    setCartAnchorEl(null);
  };

  const handleCartClick = (event) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    if (isMobile) {
      navigate('/cart');
      window.scrollTo(0, 0); // Scroll to top on mobile
    } else {
      setCartAnchorEl(cartAnchorEl ? null : event.currentTarget);
    }
  };

  const renderCartPopover = () => (
    <CartSummary onClose={() => setCartAnchorEl(null)} />
  );

  return (
    <Box
      onMouseEnter={(e) => {
        if (!isMobile) {
          handleCartMouseEnter(e);
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          handleCartMouseLeave();
        }
      }}
    >
      <StyledComponents.NavButton 
        component={Link} 
        to="/cart"
        sx={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          display: 'flex !important', 
          marginLeft: { xs: 'auto', sm: 1, md: 1.5, lg: 2 }, 
          marginRight: { xs: '20px', sm: 0 },
          color: 'white',
          textDecoration: 'none',
          '&:hover': {
            color: 'white',
            textDecoration: 'none'
          }
        }}
      >
        <Badge badgeContent={cartCount} color="warning">
          <ShoppingCart sx={{ fontSize: { xs: 20, sm: 24, md: 28, lg: 30 } }} />
        </Badge>
        <Typography variant="subtitle2" sx={{ 
          fontWeight: 'bold', 
          ml: 1, 
          display: { xs: 'none', sm: 'block' }, 
          fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem', lg: '0.95rem' } 
        }}>
          {translations[language].cart}
        </Typography>
      </StyledComponents.NavButton>
      <Popper
        open={Boolean(cartAnchorEl)}
        anchorEl={cartAnchorEl}
        placement="bottom-end"
        transition
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
          {
            name: 'preventOverflow',
            enabled: true,
            options: {
              altAxis: true,
              boundary: 'viewport',
            },
          },
          {
            name: 'flip',
            enabled: true,
          },
        ]}
        sx={{
          zIndex: 1301,
        }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <div>
              <ClickAwayListener onClickAway={() => setCartAnchorEl(null)}>
                {renderCartPopover()}
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default CartButton; 