import { Link } from 'react-router-dom';
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
  Category,
} from '@mui/icons-material';
import { StyledComponents } from './styles/NavbarStyles';
import { useAuth } from '../../contexts/AuthContext';

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  categories, 
  handleLogout 
}) => {
  const { user, isAuthenticated } = useAuth();

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
        <Typography>Menü</Typography>
      </StyledComponents.DrawerHeader>

      <Box component={Link} to={isAuthenticated ? "/account" : "/login"} 
        onClick={onClose} 
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          backgroundColor: '#232f3e',
          color: 'white',
          textDecoration: 'none',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          '&:hover': {
            color: '#f90',  
            '& .MuiSvgIcon-root': {
              color: '#f90'
            }
          }
        }}>
        <Person sx={{ 
          fontSize: 24, 
          marginRight: 1,
          transition: 'color 0.2s'
        }} />
        <Typography>
          {isAuthenticated 
            ? `Merhaba, ${user?.firstName || 'Kullanıcı'}`
            : 'Merhaba, Giriş yapın'
          }
        </Typography>
      </Box>

      <StyledComponents.DrawerList>
        <Typography className="section-header">
          <Category sx={{ verticalAlign: 'middle', mr: 1 }} />
          Kategoriler
        </Typography>
        {categories.map((category) => (
          <ListItem 
            button 
            key={category}
            component={Link}
            to={`/?category=${encodeURIComponent(category)}`}
            onClick={onClose}
          >
            <ListItemText 
              primary={category} 
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

        <Typography className="section-header">Trend Olanlar</Typography>
        <ListItem button>
          <ListItemText primary="Çok Satanlar" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Yeni Çıkanlar" />
        </ListItem>

        <Typography className="section-header">Dijital İçerik ve Cihazlar</Typography>
        <ListItem button>
          <ListItemText primary="Amazing Prime Video" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Amazing Müzik" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Prime Gaming" />
        </ListItem>

        <Typography className="section-header">Alışveriş Yap</Typography>
        <ListItem button>
          <ListItemText primary="Günün Fırsatları" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Amazing Outlet" />
        </ListItem>

        {isAuthenticated ? (
          <>
            <Typography className="section-header">Hesabım</Typography>
            <ListItem button component={Link} to="/account" onClick={onClose}>
              <ListItemText 
                primary="Hesap Ayarlarım" 
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
                primary="Siparişlerim" 
                sx={{ 
                  '& .MuiTypography-root': { 
                    color: '#f90',
                    fontWeight: 700
                  }
                }} 
              />
            </ListItem>
            <ListItem button component={Link} to="/account/addresses" onClick={onClose}>
              <ListItemText 
                primary="Adreslerim" 
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
                primary="Çıkış Yap" 
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
            <Typography className="section-header">Yardım ve Ayarlar</Typography>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Giriş Yap" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Kayıt Ol" />
            </ListItem>
          </>
        )}
      </StyledComponents.DrawerList>
    </Drawer>
  );
};

export default MobileMenu; 