import { Link, useNavigate } from 'react-router-dom';
import {
  Drawer,
  Typography,
  IconButton,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  Person,
} from '@mui/icons-material';
import { StyledComponents } from './styles/NavbarStyles';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  categories, 
  handleLogout 
}) => {
  const { user, isAuthenticated } = useAuth();
  const { language, translations } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    onClose(); // Close drawer
    window.scrollTo(0, 0); // Scroll to top
    navigate(path);
  };

  const categoryMapping = {
    'Elektronik': 'electronics',
    'Ev & Yaşam': 'homeAndLiving',
    'Moda': 'fashion',
    'Mutfak': 'kitchen',
    'Oyun & Hobi': 'gamesAndHobbies'
  };

  const reverseMapping = {
    tr: {
      electronics: 'Elektronik',
      homeAndLiving: 'Ev & Yaşam',
      fashion: 'Moda',
      kitchen: 'Mutfak',
      gamesAndHobbies: 'Oyun & Hobi'
    },
    en: {
      electronics: 'Electronics',
      homeAndLiving: 'Home & Living',
      fashion: 'Fashion',
      kitchen: 'Kitchen',
      gamesAndHobbies: 'Games & Hobbies'
    }
  };

  return (
    <Drawer 
      anchor="left" 
      open={isOpen} 
      onClose={onClose}
      PaperProps={{
        sx: { width: '85%', maxWidth: '380px' }
      }}
    >
      <StyledComponents.DrawerHeader>
        <IconButton 
          onClick={onClose}
          sx={{ 
            color: 'white', 
            marginRight: 1,
            '&:focus': {
              outline: 'none'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography>Menu</Typography>
      </StyledComponents.DrawerHeader>

      <Box component="div" 
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          backgroundColor: '#232f3e',
          color: 'white',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
        <Person sx={{ 
          fontSize: 24, 
          marginRight: 1,
        }} />
        <Typography>
          {isAuthenticated 
            ? `${t.login.greeting}, ${user?.firstName || t.login.user}`
            : t.login.loginGreeting}
        </Typography>
      </Box>

      <StyledComponents.DrawerList>
        <Typography className="section-header">
          {t.categories.title || 'Kategoriler'}
        </Typography>
        <ListItem 
          button 
          component={Link}
          to="/"
          onClick={onClose}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            cursor: 'pointer'
          }}
        >
          <ListItemText 
            primary={t.categories.all} 
            sx={{
              '& .MuiTypography-root': {
                color: '#f90',
                fontWeight: 700,
                fontSize: '0.9rem',
                pl: 2
              }
            }}
          />
        </ListItem>
        {categories.map((category) => (
          <ListItem 
            button 
            key={category}
            component={Link}
            to={`/?category=${encodeURIComponent(category)}`}
            onClick={onClose}
          >
            <ListItemText 
              primary={reverseMapping[language][categoryMapping[category]]} 
              sx={{
                '& .MuiTypography-root': {
                  color: '#f90',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  pl: 2
                }
              }}
            />
          </ListItem>
        ))}

        <Divider sx={{ my: 1 }} />

        <Typography className="section-header">{t.homePage.trending}</Typography>
        <ListItem button>
          <ListItemText primary={t.homePage.bestSellers} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={t.homePage.newReleases} />
        </ListItem>

        <Typography className="section-header">{t.homePage.digitalContent}</Typography>
        <ListItem button>
          <ListItemText primary="Amazing Prime Video" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Amazing Music" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Prime Gaming" />
        </ListItem>

        <Typography className="section-header">{t.homePage.shop}</Typography>
        <ListItem button>
          <ListItemText primary={t.homePage.todaysDeals} />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Amazing Outlet" />
        </ListItem>

        {isAuthenticated ? (
          <>
            <Typography className="section-header">{t.dashboard.title}</Typography>
            <ListItem 
              button 
              onClick={() => handleNavigation('/account')}
              sx={{ 
                padding: '12px 16px',
                cursor: 'pointer'
              }}
            >
              <ListItemText 
                primary={t.dashboard.title}
                sx={{ 
                  '& .MuiTypography-root': { 
                    color: '#f90',
                    fontWeight: 700
                  }
                }} 
              />
            </ListItem>
            <ListItem button component={Link} to="/orders" onClick={onClose}>
              <ListItemText 
                primary={t.dashboard.orders.title}
                sx={{ 
                  '& .MuiTypography-root': { 
                    color: '#f90',
                    fontWeight: 700
                  }
                }} 
              />
            </ListItem>
            <ListItem 
              button 
              onClick={() => {
                handleLogout();
                onClose();
              }}
              sx={{ 
                cursor: 'pointer',
                backgroundColor: '#dc3545',
                '&:hover': {
                  backgroundColor: '#c82333'
                }
              }}
            >
              <ListItemText 
                primary={t.login.logoutButton}
                sx={{ 
                  '& .MuiTypography-root': { 
                    color: '#ffffff',
                    fontWeight: 600
                  }
                }} 
              />
            </ListItem>
          </>
        ) : (
          <>
            <Typography className="section-header">{t.homePage.helpSettings}</Typography>
            <ListItem button component={Link} to="/login">
              <ListItemText primary={t.login.loginButton} />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary={t.login.register} />
            </ListItem>
          </>
        )}
      </StyledComponents.DrawerList>
    </Drawer>
  );
};

export default MobileMenu; 