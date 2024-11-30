import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  LocationOn,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { toast } from 'react-hot-toast';
import SearchBarComponent from './SearchBar';
import { StyledComponents, AccountMenu, MenuSection, SignInButton } from './styles/NavbarStyles';
import MobileMenu from './MobileMenu';
import CartButton from './CartButton';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { getCartCount} = useCart();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [setCategoryError] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { language } = useLanguage();
  const location = useLocation();
  const translations = {
    tr: {
      deliveryAddress: 'Teslimat adresi',
      turkey: 'Türkiye',
      searchPlaceholder: "Amazing'de Ara",
      hello: 'Merhaba',
      signIn: 'Giriş Yapın',
      accountAndLists: 'Hesap ve Listeler',
      myAccount: 'Hesabım',
      accountDetails: 'Hesap Detayları',
      myOrders: 'Siparişlerim',
      logout: 'Çıkış Yap',
      newCustomer: 'Yeni müşteri misiniz?',
      createAccount: 'Hesap oluşturun',
      logoutSuccess: 'Başarıyla çıkış yapıldı'
    },
    en: {
      deliveryAddress: 'Delivery address',
      turkey: 'Turkey',
      searchPlaceholder: 'Search Amazing',
      hello: 'Hello',
      signIn: 'Sign In',
      accountAndLists: 'Account & Lists',
      myAccount: 'My Account',
      accountDetails: 'Account Details',
      myOrders: 'My Orders',
      logout: 'Logout',
      newCustomer: 'New customer?',
      createAccount: 'Create account',
      logoutSuccess: 'Successfully logged out'
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/products/categories');
        console.log('Categories response:', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
        setCategoryError('Kategoriler yüklenemedi');
      }
    };

    fetchCategories();
  }, []);

  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    setAccountMenuOpen(false);
    toast.success(translations[language].logoutSuccess);
    navigate('/login', { replace: true });
  };

  const handleMobileSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  };

  const renderLocationButton = () => (
    <StyledComponents.LocationButton>
      <LocationOn sx={{ mr: 1, fontSize: { xs: 18, sm: 20, md: 24 } }} />
      <Box>
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#ccc', 
            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
            display: 'block',
            lineHeight: 1
          }}
        >
          {translations[language].deliveryAddress}
        </Typography>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontWeight: 'bold', 
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
            lineHeight: 1
          }}
        >
          {translations[language].turkey}
        </Typography>
      </Box>
    </StyledComponents.LocationButton>
  );


  const renderSearchBar = () => (
    <SearchBarComponent 
      categories={categories}
      isMobile={isMobile}
    />
  );

  const renderNavButtons = () => (
    <>
      <Box 
        onMouseEnter={() => !isMobile && setAccountMenuOpen(true)}
        onMouseLeave={() => !isMobile && setAccountMenuOpen(false)}
        sx={{ 
          position: 'relative',
          display: { xs: 'none', sm: 'block' }
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start',
            color: 'white',
            padding: '4px 8px',
            cursor: 'pointer',
            '&:hover': {
              outline: '1px solid #fff',
              borderRadius: '2px'
            }
          }}
        >
          <Typography variant="caption" sx={{ fontSize: { xs: '10px', sm: '11px', md: '12px' }, lineHeight: 1.1 }}>
            {isAuthenticated ? `${translations[language].hello}, ${user?.firstName}` : `${translations[language].hello}, ${translations[language].signIn}`}
          </Typography>
          <Typography sx={{ fontSize: { xs: '12px', sm: '13px', md: '14px' }, fontWeight: 'bold', lineHeight: 1.1 }}>
            {translations[language].accountAndLists}
          </Typography>
        </Box>

        <AccountMenu isOpen={accountMenuOpen}>
          {!isAuthenticated ? (
            <Box sx={{ textAlign: 'center' }}>
              <SignInButton
                component={Link}
                to="/login"
                variant="contained"
              >
                {translations[language].signIn}
              </SignInButton>
              <Typography variant="body2" sx={{ mt: 2, color: '#444' }}>
                {translations[language].newCustomer}{' '}
                <Link 
                  to="/register" 
                  style={{ 
                    color: '#007185',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#C7511F',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {translations[language].createAccount}
                </Link>
              </Typography>
            </Box>
          ) : (
            <MenuSection>
              <Typography className="title">
                {translations[language].myAccount}
              </Typography>
              <Link to="/account" className="menu-item">{translations[language].accountDetails}</Link>
              <Link to="/account/orders" className="menu-item">{translations[language].myOrders}</Link>
              <Link 
                onClick={() => {
                  handleLogout();
                  setAccountMenuOpen(false);
                }}
                className="menu-item"
                style={{ 
                  color: '#dc3545'
                }}
              >
                {translations[language].logout}
              </Link>
            </MenuSection>
          )}
        </AccountMenu>
      </Box>
    </>
  );

  const renderMobileSearchBar = () => (
    <StyledComponents.MobileSearchBar>
      {isSearchOpen ? (
        <StyledComponents.MobileSearchInput>
          <InputBase
            placeholder={translations[language].searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(e);
                setSearchQuery('');
                setIsSearchOpen(false);
              }
            }}
            autoFocus
            sx={{ flex: 1 }}
          />
          <IconButton onClick={handleSearchClose}>
            <CloseIcon />
          </IconButton>
        </StyledComponents.MobileSearchInput>
      ) : (
        <StyledComponents.MobileSearchInput onClick={handleMobileSearchClick}>
          <SearchIcon sx={{ color: '#666', mr: 1 }} />
          <Typography
            sx={{
              color: '#666',
              flex: 1,
              fontSize: '0.9rem',
            }}
          >
            {translations[language].searchPlaceholder}
          </Typography>
        </StyledComponents.MobileSearchInput>
      )}
    </StyledComponents.MobileSearchBar>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#131921', zIndex: 1200 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
          <StyledComponents.MobileMenuButton onClick={handleMobileMenuToggle}>
            <MenuIcon />
          </StyledComponents.MobileMenuButton>

          <a href="/" onClick={handleLogoClick}>
            <StyledComponents.LogoImage src="/src/assets/img/logo.png" alt="Amazing Logo" />
          </a>

          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flex: 1,
              maxWidth: '1000px',
              margin: '0 16px'
            }}>
              {renderLocationButton()}
              {renderSearchBar()}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderNavButtons()}
            <CartButton />
          </Box>
        </Toolbar>

        {isMobile && renderMobileSearchBar()}
        <MobileMenu 
          isOpen={mobileMenuOpen}
          onClose={handleMobileMenuToggle}
          categories={categories}
          handleLogout={handleLogout}
        />
      </AppBar>
      <Toolbar 
        sx={{ 
          mb: 2,  
          height: {
            xs: '100px',   
            sm: '64px',   
            md: '70px',   
            lg: '80px'    
          }
        }} 
      />
    </>
  );
};

export default Navbar;