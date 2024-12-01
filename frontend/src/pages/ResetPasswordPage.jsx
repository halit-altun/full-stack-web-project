import { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import AuthFooter from '../components/Auth/AuthFooter';
import AnimatedCheckmark from '../components/Common/AnimatedCheckmark';
import { useLanguage } from '../contexts/LanguageContext';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '400px',
  width: '100%'
}));

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { language, translations } = useLanguage();
  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setPasswordError('');
    
    if (password !== confirmPassword) {
      setPasswordError(t.dashboard.changePassword.passwordMismatch);
      return;
    }
    
    if (password.length < 6) {
      setPasswordError(language === 'tr' ? 'Şifre en az 6 karakter olmalıdır' : 'Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(`/api/users/reset-password/${token}`, {
        password: password
      });
      
      if (response.data?.isSamePassword) {
        setPasswordError(language === 'tr' ? 'Yeni şifreniz eski şifrenizle aynı olamaz' : 'New password cannot be the same as your old password');
        return;
      }
      
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      
    } catch (error) {
      if (error.response?.data?.message === 'New password cannot be the same as the old password') {
        setPasswordError(language === 'tr' ? 'Yeni şifreniz eski şifrenizle aynı olamaz' : 'New password cannot be the same as your old password');
      } else {
        toast.error(error.response?.data?.message || (language === 'tr' ? 'Şifre sıfırlama başarısız oldu' : 'Password reset failed'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth={false}
      disableGutters
      sx={{
        width: '100vw',
        maxWidth: '100vw !important',
        padding: { xs: 1, sm: 2, md: 3 },
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        pt: { xs: 4, sm: 6 },
        pb: { xs: 4, sm: 6 }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
        mx: 'auto',
        my: 'auto'
      }}>
        <FormContainer>
          {isSuccess ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              py: 2 
            }}>
              <AnimatedCheckmark />
              <Typography variant="h6" align="center" gutterBottom>
                {language === 'tr' ? 'Şifreniz başarıyla değiştirildi!' : 'Your password has been changed successfully!'}
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                {language === 'tr' ? 'Giriş sayfasına yönlendiriliyorsunuz...' : 'Redirecting to login page...'}
              </Typography>
            </Box>
          ) : (
            <>
              <Typography component="h1" variant="h5" gutterBottom>
                {t.forgotPassword.title}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={t.dashboard.changePassword.newPassword}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label={t.dashboard.changePassword.confirmPassword}
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#FFD814',
                    color: '#0F1111',
                    '&:hover': {
                      backgroundColor: '#F7CA00'
                    },
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '14px',
                    borderRadius: '8px',
                    boxShadow: 'none',
                    padding: '8px 10px',
                    '&:focus': {
                      outline: 'none'
                    },
                    '&.Mui-disabled': {
                      backgroundColor: '#F7F8F8',
                      color: '#D5D9D9'
                    }
                  }}
                >
                  {t.dashboard.changePassword.changeButton} 
                </Button>
              </form>
            </>
          )}
        </FormContainer>
      </Box>
      <AuthFooter isMobile={isMobile} />
    </Container>
  );
};

export default ResetPassword; 