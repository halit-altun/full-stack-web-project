import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Dialog, Container } from '@mui/material';

export const StyledComponents = {
  Container: styled(Box)(({ theme }) => ({
    padding: '20px',
    backgroundColor: '#fff',
    maxWidth: '1500px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  })),

  CartItemContainer: styled(Box)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  })),

  QuantityButton: styled(Button)(({ theme }) => ({
    padding: '4px 8px',
    minWidth: 'unset',
    border: '1px solid #D5D9D9',
    borderRadius: '4px',
    backgroundColor: '#F0F2F2',
    color: '#0F1111',
    '&:hover': {
      backgroundColor: '#E3E6E6',
    },
  })),

  DeleteButton: styled(Button)(({ theme }) => ({
    color: '#0F1111',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#F7FAFA',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: 'none'
    },
    '&.MuiButton-root': {
      outline: 'none'
    }
  })),

  CheckoutButton: styled(Button)(({ theme }) => ({
    backgroundColor: '#FFD814',
    color: '#0F1111',
    '&:hover': {
      backgroundColor: '#F7CA00',
    },
    padding: '8px 16px',
    borderRadius: '8px',
    width: '100%',
    textTransform: 'none',
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

export const StyledAddressBox = styled(Box)(({ theme }) => ({
  border: '1px solid #DDD',
  borderRadius: '8px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: '#F8F8F8',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#F0F0F0',
    borderColor: '#888',
  }
}));

export const AddressSelect = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5),
  border: '1px solid #DDD',
  borderRadius: '8px',
  backgroundColor: '#fff',
  cursor: 'pointer',
  maxWidth: '100%',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: '#F7FAFA',
  }
}));

export const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  flex: '1',
  marginTop: '20px',
  padding: theme.spacing(2),
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  maxWidth: '1400px',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  }
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '8px',
    padding: theme.spacing(2),
    maxWidth: '400px',
    width: '90%'
  }
})); 