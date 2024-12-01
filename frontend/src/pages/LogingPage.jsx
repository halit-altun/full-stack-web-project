import React, { useState, useEffect } from 'react';
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
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import AuthFooter from '../components/Auth/AuthFooter';
import AnimatedCheckmark from '../components/Common/AnimatedCheckmark';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';
import { setUser } from '../redux/slices/authSlice';
import api from '../services/api';

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
  const location = useLocation();
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const t = translations[language].login;
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Only redirect if user was already authenticated before visiting login page
    const initialAuthCheck = () => {
      if (isAuthenticated) {
        navigate('/', { replace: true });
      }
    };
    initialAuthCheck();
  }, []); // Empty dependency array for initial check only

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

  const validateForm = () => {
    let isValid = true;
    
    if (!formData.email) {
      setError(t.emailRequired);
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError(t.emailInvalid);
      isValid = false;
    } else {
      setError('');
    }

    if (!formData.password) {
      setError(t.passwordRequired);
      isValid = false;
    } else {
      setError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Email validation
    if (!formData.email.trim()) {
      setError(translations[language].errors.emailRequired);
      setLoading(false);
      return;
    }

    // Password validation
    if (!formData.password.trim()) {
      setError(translations[language].errors.passwordRequired);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/users/check-email', { email: formData.email });
      
      if (!response.data.exists) {
        setError(translations[language].errors.emailNotRegistered);
        setLoading(false);
        return;
      }

      try {
        await authService.login(formData);
        setIsSubmitted(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } catch (error) {
        if (error.response?.status === 401) {
          setError(translations[language].errors.invalidPassword);
        } else {
          setError(translations[language].errors.loginFailed);
        }
        setLoading(false);
      }
    } catch (error) {
      if (error.response?.data?.message === 'Email already exists') {
        setError(translations[language].errors.emailExists);
      } else {
        setError(error.response?.data?.message || translations[language].errors.loginFailed);
      }
    } finally {
      setLoading(false);
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
                {t.title}
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
                  label={t.email}
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
                  label={t.password}
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
                    {t.forgotPassword}
                  </Link>
                </Box>

                <SubmitButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? t.loading : t.loginButton}
                </SubmitButton>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2">
                    {t.registerPrompt}{' '}
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
                      {t.register}
                    </Link>
                  </Typography>
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
              <Typography variant="h6">{t.success}</Typography>
            </Box>
          )}
        </FormContainer>
      </Box>
      <AuthFooter isMobile={isMobile} />
    </Container>
  );
}; 

export default Login;
