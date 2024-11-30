import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../contexts/LanguageContext';
import { useEffect } from 'react';

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  flex: '1',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column'
}));

const MenuCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const DashboardPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language].dashboard;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const menuItems = [
    {
      icon: <PersonIcon sx={{ color: '#f90' }} />,
      title: t.profile.title,
      description: t.profile.description,
      path: '/account/profile',
    },
    {
      icon: <ShoppingBagIcon sx={{ color: '#f90' }} />,
      title: t.orders.title,
      description: t.orders.description,
      path: '/account/orders',
    },
    {
      icon: <LocationOnIcon sx={{ color: '#f90' }} />,
      title: t.addresses.title,
      description: t.addresses.description,
      path: '/account/addresses',
    },
    {
      icon: <LockIcon sx={{ color: '#f90' }} />,
      title: t.security.title,
      description: t.security.description,
      path: '/account/change-password',
    }
  ].map(item => ({
    ...item,
    titleStyle: { 
      color: '#0F1111',  // Dark black color
      fontWeight: 500,  
      fontSize: '1.1rem' 
    }
  }));

  return (
    <PageContainer>
      <StyledContainer>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ color: '#0F1111' }}
          >
            {t.title}
          </Typography>
          <Grid container spacing={3}>
            {menuItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <MenuCard onClick={() => navigate(item.path)}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    {item.icon}
                    <Box>
                      <Typography variant="h6" gutterBottom style={item.titleStyle}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                </MenuCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </StyledContainer>
    </PageContainer>
  );
};

export default DashboardPage; 