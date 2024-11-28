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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setPasswordError('');
    
    if (password !== confirmPassword) {
      setPasswordError('Şifreler eşleşmiyor');
      return;
    }
    
    if (password.length < 6) {
      setPasswordError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(`/api/users/reset-password/${token}`, {
        password: password
      });
      
      if (response.data?.isSamePassword) {
        setPasswordError('Yeni şifreniz eski şifrenizle aynı olamaz');
        return;
      }
      
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      if (error.response?.data?.message === 'New password cannot be the same as the old password') {
        setPasswordError('Yeni şifreniz eski şifrenizle aynı olamaz');
      } else {
        toast.error(error.response?.data?.message || 'Şifre sıfırlama başarısız oldu');
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
                Şifreniz başarıyla değiştirildi!
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                Giriş sayfasına yönlendiriliyorsunuz...
              </Typography>
            </Box>
          ) : (
            <>
              <Typography component="h1" variant="h5" gutterBottom>
                Şifre Sıfırlama
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Yeni Şifre"
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
                  label="Şifreyi Tekrar Girin"
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
                  Şifreyi Değiştir
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