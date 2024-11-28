import { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import api from '../services/api';
import AuthFooter from '../components/Auth/AuthFooter';
import AnimatedCheckmark from '../components/Common/AnimatedCheckmark';

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(3),
  borderRadius: '8px',
  border: '1px solid #ddd',
  maxWidth: '350px',
  width: '100%',
}));



const ForgotPassword = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Lütfen geçerli bir email adresi giriniz');
      setLoading(false);
      return;
    }
    
    try {
      const response = await api.post('/api/users/forgot-password', { email });
      if (response.data.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      setError('Bu email adresi ile kayıtlı bir hesap bulunmamaktadır');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        backgroundColor: '#fff',
        py: 4
      }}
    >
      <Box sx={{ width: '100%', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '350px',
            width: '100%'
          }}
        >
          <FormContainer>
            <Typography variant="h1" sx={{ fontSize: '28px', mb: 3, color: '#000', textAlign: 'center' }}>
              Şifre Sıfırlama
            </Typography>

            {!isSubmitted ? (
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 2, color: '#000' }}>
                  Hesabınızla ilişkili e-posta adresini girin
                </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!error}
                  helperText={error}
                  sx={{ mb: 2 }}
                  inputProps={{
                    type: 'text'
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    backgroundColor: '#FFD814',
                    color: '#0F1111',
                    '&:hover': {
                      backgroundColor: '#F7CA00',
                    },
                    '&:focus': {
                      outline: 'none'
                    },
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '14px',
                    borderRadius: '8px',
                    boxShadow: 'none',
                    '&.Mui-disabled': {
                      backgroundColor: '#F7F8F8',
                      color: '#D5D9D9'
                    }
                  }}
                >
                  {loading ? 'Gönderiliyor...' : 'Devam Et'}
                </Button>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <AnimatedCheckmark />
                <Typography variant="h6" gutterBottom>
                  E-posta Gönderildi
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. 
                  Lütfen gelen kutunuzu kontrol edin.
                </Typography>
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="body2"
                  underline="hover"
                >
                  Giriş sayfasına dön
                </Link>
              </Box>
            )}
          </FormContainer>



          
        </Box>
      </Box>
      <AuthFooter isMobile={isMobile} />
    </Container>
  );
};

export default ForgotPassword; 