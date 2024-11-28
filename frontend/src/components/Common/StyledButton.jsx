import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme, className }) => ({
  backgroundColor: className === 'outlined' ? 'transparent' : '#FFD814',
  color: className === 'outlined' ? '#0F1111' : '#0F1111',
  border: className === 'outlined' ? '1px solid #D5D9D9' : 'none',
  '&:hover': {
    backgroundColor: className === 'outlined' ? '#F7FAFA' : '#F7CA00',
    border: className === 'outlined' ? '1px solid #D5D9D9' : 'none',
  },
  '&:focus': {
    outline: 'none !important',
    boxShadow: 'none !important'
  },
  '&.MuiButton-root': {
    outline: 'none !important'
  },
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '14px',
  borderRadius: '8px',
  boxShadow: 'none',
  padding: '8px 16px',
  '&.Mui-disabled': {
    backgroundColor: '#F7F8F8',
    color: '#D5D9D9'
  }
}));

export default StyledButton; 