import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
  IconButton,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import AuthFooter from '../components/Auth/AuthFooter';
import AnimatedCheckmark from '../components/Common/AnimatedCheckmark';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '350px',
  margin: '0 auto',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,.13)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    maxWidth: '300px'
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#FFD814',
  color: '#0F1111',
  '&:hover': {
    backgroundColor: '#F7CA00',
  },
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '14px',
  borderRadius: '8px',
  boxShadow: 'none',
  padding: '8px 10px',
  marginTop: theme.spacing(1),
  '&.Mui-disabled': {
    backgroundColor: '#F7F8F8',
    color: '#D5D9D9'
  },
  '&:focus': {
    outline: 'none !important',
    boxShadow: 'none !important'
  }
}));

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login(formData)).unwrap();
      if (result) {
        setIsSubmitted(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Container 
      component="main" 
      maxWidth="xs" 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4
        }}
      >
        <FormContainer>
          {!isSubmitted ? (
            <>
              <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                Giriş Yap
              </Typography>

              {error && (
                <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                  {error}
                </Typography>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-posta adresi"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Şifre"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="şifre görünürlüğünü değiştir"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                          sx={{
                            '&:focus': {
                              outline: 'none'
                            },
                            '&:hover': {
                              backgroundColor: 'transparent'
                            }
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ textAlign: 'right', mt: 1 }}>
                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    variant="body2"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      fontSize: isMobile ? '0.8rem' : '0.875rem',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Parolamı Unuttum
                  </Link>
                </Box>

                <SubmitButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </SubmitButton>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="body2"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Hesabınız yok mu? Kayıt olun
                  </Link>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              py: 2 
            }}>
              <AnimatedCheckmark />
              <Typography variant="h6">Giriş başarılı!</Typography>
            </Box>
          )}
        </FormContainer>
      </Box>
      <AuthFooter isMobile={isMobile} />
    </Container>
  );
};

export default Login;
