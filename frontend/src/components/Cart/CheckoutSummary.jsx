import { Box, Typography, CircularProgress } from '@mui/material';
import StyledButton from '../Common/StyledButton';
import { useLanguage, translations } from '../../contexts/LanguageContext';

const CheckoutSummary = ({ 
  cartCount, 
  getCartTotal, 
  selectedAddress, 
  isLoading, 
  handleCheckoutClick 
}) => {
  const { language } = useLanguage();
  const t = translations[language].cart;

  return (
    <Box
      sx={{
        backgroundColor: '#f8f8f8',
        padding: { xs: '15px', sm: '20px' },
        borderRadius: '8px',
        border: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: '#0F1111' }}>
        {t.subtotal} ({cartCount} {t.items}):{' '}
        <span style={{ color: '#B12704' }}>
          ₺{getCartTotal().toFixed(2)}
        </span>
      </Typography>
      <StyledButton
        onClick={handleCheckoutClick}
        variant="contained"
        disabled={!selectedAddress || isLoading}
        sx={{
          position: 'relative',
          width: 'fit-content',
          '& .MuiCircularProgress-root': {
            color: '#0F1111',
            marginRight: '8px'
          }
        }}
      >
        {isLoading ? (
          <>
            <CircularProgress size={20} />
            {t.processing}
          </>
        ) : (
          t.checkout
        )}
      </StyledButton>
    </Box>
  );
};

export default CheckoutSummary; 