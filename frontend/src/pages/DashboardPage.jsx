import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';

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

  const menuItems = [
    {
      icon: <PersonIcon sx={{ fontSize: 40, color: '#f90' }} />,
      title: 'Profil Bilgileri',
      description: 'Kişisel bilgilerinizi görüntüleyin ve düzenleyin',
      onClick: () => navigate('/account/profile')
    },
    {
      icon: <ShoppingBagIcon sx={{ fontSize: 40, color: '#f90' }} />,
      title: 'Siparişlerim',
      description: 'Siparişlerinizi görüntüleyin ve takip edin',
      onClick: () => navigate('/account/orders')
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: '#f90' }} />,
      title: 'Adreslerim',
      description: 'Kayıtlı adreslerinizi yönetin',
      onClick: () => navigate('/account/addresses')
    },
    {
      icon: <LockIcon sx={{ fontSize: 40, color: '#f90' }} />,
      title: 'Şifre Değiştir',
      description: 'Hesap şifrenizi güncelleyin',
      onClick: () => navigate('/account/change-password')
    }
  ].map(item => ({
    ...item,
    titleStyle: { 
      color: '#0F1111',  // Dark black color
      fontWeight: 500,   // Semi-bold font
      fontSize: '1.1rem' // Bi
    }
  }));

  return (
    <PageContainer>
      <StyledContainer>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#0F1111' }}>
            Hesabım
          </Typography>
          <Grid container spacing={3}>
            {menuItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <MenuCard onClick={item.onClick}>
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