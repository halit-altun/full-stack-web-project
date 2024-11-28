import { styled } from '@mui/material';
import { Box, IconButton, Button, Paper, List, Link } from '@mui/material';

export const StyledComponents = {
  LogoImage: styled('img')(({ theme }) => ({
    height: '40px',
    padding: '8px 8px',
    '&:hover': { outline: '1px solid white' },
    [theme.breakpoints.up('lg')]: { height: '80px' },
    [theme.breakpoints.between('md', 'lg')]: { height: '75px' },
    [theme.breakpoints.between('sm', 'md')]: { height: '65px' },
    [theme.breakpoints.down('sm')]: { height: '55px' },
  })),

  MobileMenuButton: styled(IconButton)(({ theme }) => ({
    color: 'white',
    display: 'none',
    '&:focus': {
      outline: 'none'
    },
    [theme.breakpoints.down('md')]: { display: 'flex' },
  })),

  NavButton: styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '4px 8px',
    cursor: 'pointer',
    color: 'white',
    minWidth: 'fit-content',
    textDecoration: 'none',
    height: '100%',
    maxHeight: { xs: '40px', sm: '45px', md: '50px' },
    '& .button-line-1': {
      fontSize: '12px',
      lineHeight: 1,
      marginBottom: '2px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '11px',
      },
    },
    '& .button-line-2': {
      fontSize: '14px',
      fontWeight: 'bold',
      lineHeight: 1,
      [theme.breakpoints.down('sm')]: {
        fontSize: '13px',
      },
    },
    '&:hover': { 
      [theme.breakpoints.up('md')]: { 
        outline: '1px solid white',
        borderRadius: '2px'
      }
    },
    [theme.breakpoints.down('sm')]: {
      padding: '2px 4px',
      maxHeight: '36px',
    },
    [theme.breakpoints.down('lg')]: {
      marginLeft: theme.spacing(1),
      padding: theme.spacing(0.4),
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(0.5),
      padding: theme.spacing(0.3),
    },
    [theme.breakpoints.down('md')]: { display: 'none' },
  })),

  LocationButton: styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    cursor: 'pointer',
    color: 'white',
    minWidth: 'fit-content',
    '&:hover': { 
      outline: '1px solid white',
      borderRadius: '2px'
    },
    [theme.breakpoints.down('sm')]: { 
      display: 'none' 
    },
    [theme.breakpoints.down('md')]: { display: 'none' },
  })),

  DrawerHeader: styled(Box)(({ theme }) => ({
    backgroundColor: '#232f3e',
    color: 'white',
    padding: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    '& .MuiTypography-root': {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
  })),

  DrawerList: styled(List)(({ theme }) => ({
    padding: 0,
    '& .MuiListItem-root': {
      padding: theme.spacing(1.5),
    },
    '& .MuiListItemIcon-root': {
      minWidth: '40px',
      color: '#111',
    },
    '& .MuiListItemText-primary': {
      fontSize: '0.95rem',
      fontWeight: 500,
    },
    '& .section-header': {
      backgroundColor: '#f9f9f9',
      padding: '10px 16px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
    },
  })),

  DrawerSection: styled(Box)(({ theme }) => ({
    '& .section-title': {
      padding: theme.spacing(1.5),
      backgroundColor: '#f6f6f6',
      fontWeight: 'bold',
    },
  })),

  SignInPopover: styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    width: 320,
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  })),

  SignInButton: styled(Button)(({ theme }) => ({
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
    padding: '8px 10px',
    marginTop: theme.spacing(1)
  })),

  RegisterButton: styled(Button)(({ theme }) => ({
    width: '100%',
    backgroundColor: '#f1f1f1',
    color: '#111',
    border: '1px solid #ddd',
    '&:hover': {
      backgroundColor: '#e7e7e7',
    },
  })),

  CartPopover: styled(Paper)(({ theme }) => ({
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
      background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)',
      color: '#111',
      border: '1px solid #a88734',
      '&:hover': {
        background: 'linear-gradient(to bottom, #f5d78e, #eeb933)',
      },
    },
  })),

  CartItemQuantityButton: styled(IconButton)(({ theme }) => ({
    padding: 4,
    border: '1px solid #D5D9D9',
    borderRadius: 4,
    backgroundColor: '#F0F2F2',
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
      textDecoration: 'underline',
    },
  })),

  DeleteButton: styled(IconButton)(({ theme }) => ({
    padding: 4,
    color: '#007185',
    '&:hover': {
      color: '#C7511F',
      backgroundColor: 'transparent',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '18px',
    },
  })),

  NavbarContainer: styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(0.5),
    },
  })),

  RightSection: styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginLeft: 'auto',
    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(1),
    },
  })),

  SearchSection: styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    maxWidth: '800px',
    margin: '0 16px',
    [theme.breakpoints.down('md')]: {
      margin: '0 8px',
      maxWidth: '600px',
    },
  })),

  MobileSearchBar: styled(Box)(({ theme }) => ({
    display: 'none',
    width: '100%',
    padding: '8px 12px',
    backgroundColor: '#232f3e',
    height: '56px',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  })),

  MobileSearchInput: styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    padding: '6px 10px',
    height: '40px',
    '& .MuiInputBase-root': {
      height: '100%',
    },
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#f7f7f7',
    },
  })),
};

export const AccountMenu = styled(Box)(({ theme, isOpen }) => ({
  position: 'absolute',
  top: '100%',
  right: 0,
  width: '350px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '3px',
  padding: '20px',
  zIndex: 1000,
  boxShadow: '0 2px 4px rgba(0,0,0,.13)',
  marginTop: '1px',
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(-10px)',
  transition: 'all 0.2s ease-in-out',
  [theme.breakpoints.up('sm')]: {
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
  }
}));

export const MenuSection = styled(Box)(({ theme }) => ({
  '& .title': {
    fontSize: '14px',
    fontWeight: 500,
    color: '#0F1111',
    padding: '8px 10px',
    backgroundColor: '#FFD814',
    margin: '-20px -20px 10px -20px',
  },
  '& .menu-item': {
    fontSize: '13px',
    color: '#111',
    padding: '6px 20px',
    display: 'block',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#f3f3f3',
      textDecoration: 'none'
    }
  }
}));

export const SignInButton = styled(Button)(({ theme }) => ({
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
  padding: '8px 10px',
  marginTop: theme.spacing(1)
})); 