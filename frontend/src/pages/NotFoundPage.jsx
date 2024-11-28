import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import StyledButton from '../components/Common/StyledButton';
import AuthFooter from '../components/Auth/AuthFooter';
import { useTheme, useMediaQuery } from '@mui/material';

const NotFoundContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  padding: theme.spacing(3),
  textAlign: 'center'
}));

const NotFoundPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <NotFoundContainer>
        <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '4rem', sm: '6rem' } }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Sayfa Bulunamadı
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.
        </Typography>
        <StyledButton
          component={Link}
          to="/"
          variant="contained"
          sx={{ minWidth: '200px' }}
        >
          Ana Sayfaya Dön
        </StyledButton>
      </NotFoundContainer>
      <AuthFooter isMobile={isMobile} />
    </Box>
  );
};

export default NotFoundPage; 