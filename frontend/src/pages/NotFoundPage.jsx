import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import StyledButton from '../components/Common/StyledButton';
import AuthFooter from '../components/Auth/AuthFooter';
import { useTheme, useMediaQuery } from '@mui/material';
import { useLanguage, translations } from '../contexts/LanguageContext';

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
  const { language } = useLanguage();
  const t = translations[language].notFound;

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
          {t.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t.description}
        </Typography>
        <StyledButton
          component={Link}
          to="/"
          variant="contained"
          sx={{ minWidth: '200px' }}
        >
          {t.backToHome}
        </StyledButton>
      </NotFoundContainer>
      <AuthFooter isMobile={isMobile} />
    </Box>
  );
};

export default NotFoundPage; 