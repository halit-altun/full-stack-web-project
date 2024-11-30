import { Box, Typography, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';
import { Link as RouterLink, Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { StyledAddressBox, AddressSelect } from '../../styles/CartPageStyles';
import StyledButton from '../Common/StyledButton';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../contexts/LanguageContext';

const DeliveryAddress = ({ 
  isAuthenticated,
  loading,
  addresses,
  selectedAddress,
  setSelectedAddress,
  user
}) => {
  const { language } = useLanguage();
  const t = translations[language].cart.deliveryAddress;
  const [openAddressModal, setOpenAddressModal] = useState(false);

  if (!isAuthenticated) {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            fontSize: '18px',
            fontWeight: 500,
            color: '#0F1111'
          }}
        >
          {t.title}
        </Typography>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            border: '1px solid #DDD',
            borderRadius: '8px',
            backgroundColor: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <LockIcon sx={{ fontSize: 48, color: '#FFD814', mb: 2 }} />
          <Typography variant="h6" align="center" sx={{ mb: 1, fontWeight: 700 }}>
            {t.loginRequired}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
            {t.loginRequired}
          </Typography>
          <StyledButton
            component={RouterLink}
            to="/login"
            sx={{
              px: 4,
              py: 1
            }}
          >
            {t.loginButton}
          </StyledButton>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {t.noAccount} {' '}
            <Link 
              component={RouterLink} 
              to="/register" 
              sx={{ 
                color: '#007185',
                textDecoration: 'none',
                '&:hover': {
                  color: '#C7511F',
                  textDecoration: 'underline'
                }
              }}
            >
              {t.registerNow}
            </Link>
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (loading) {
    return <CircularProgress size={20} />;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2,
          fontSize: '18px',
          fontWeight: 500,
          color: '#0F1111'
        }}
      >
        {t.title}
      </Typography>

      {addresses.length === 0 ? (
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 3,
          bgcolor: '#FFF',
          borderRadius: '8px',
          border: '1px solid #DDD',
          px: 2,
          width: '1216px',
          maxWidth: '100%',
          mx: 'auto'
        }}>
          <LocationOnIcon sx={{ 
            fontSize: 40, 
            color: '#FFD814',
            mb: 1.5 
          }} />
          <Typography 
            variant="body1" 
            sx={{
              fontWeight: 500,
              color: '#0F1111',
              textAlign: 'center',
              mb: 1
            }}
          >
            {t.noAddresses}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              textAlign: 'center' 
            }}
          >
            {t.addAddress}
          </Typography>
          <Button
            component={Link}
            to="/account/addresses"
            variant="contained"
            sx={{
              bgcolor: '#FFD814',
              color: '#0F1111',
              '&:hover': {
                bgcolor: '#F7CA00'
              },
              fontWeight: 500,
              boxShadow: 'none',
              borderRadius: '8px',
              px: 4
            }}
          >
            {t.addAddress}
          </Button>
        </Box>
      ) : (
        <>
          <AddressSelect onClick={() => setOpenAddressModal(true)}>
            <LocationOnIcon sx={{ color: '#FFD814' }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#0F1111' }}>
                {selectedAddress?.title || t.selectAddress}
              </Typography>
              {selectedAddress && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {selectedAddress.fullAddress}, {selectedAddress.district}/{selectedAddress.city}
                </Typography>
              )}
            </Box>
            <ArrowDropDownIcon sx={{ color: '#555' }} />
          </AddressSelect>

          <Dialog 
            open={openAddressModal} 
            onClose={() => setOpenAddressModal(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle sx={{ borderBottom: '1px solid #DDD' }}>
              {t.modalTitle}
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              {addresses.map((address) => (
                <StyledAddressBox
                  key={address._id}
                  onClick={() => {
                    setSelectedAddress(address);
                    setOpenAddressModal(false);
                  }}
                  sx={{
                    border: selectedAddress?._id === address._id ? '2px solid #232F3E' : '1px solid #DDD',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                    {address.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {address.fullAddress}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {address.district}, {address.city}, {address.postalCode}
                  </Typography>
                </StyledAddressBox>
              ))}
            </DialogContent>
            <DialogActions sx={{ borderTop: '1px solid #DDD', p: 2 }}>
              <StyledButton
                variant="contained"
                component={Link}
                to="/account/addresses"
              >
                {t.addNewAddress}
              </StyledButton>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default DeliveryAddress;