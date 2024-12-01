import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Link,
  useTheme,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import AuthFooter from '../components/Auth/AuthFooter';
import StyledButton from '../components/Common/StyledButton';
import AnimatedCheckmark from '../components/Common/AnimatedCheckmark';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '350px',
  margin: '0 auto',
  marginBottom: theme.spacing(8),
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,.13)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    maxWidth: '300px',
    marginBottom: theme.spacing(4)
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
  }
}));

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: {
      countryCode: '',
      number: ''
    },
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isAuthenticated } = useAuth();
  const { language, translations } = useLanguage();
  const t = translations[language].register;
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'countryCode') {
      setFormData(prev => ({
        ...prev,
        phone: {
          ...prev.phone,
          countryCode: value
        }
      }));
    } else if (name === 'phoneNumber') {
      const numbersOnly = value.replace(/[^\d]/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        phone: {
          ...prev.phone,
          number: numbersOnly
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = t.validation.firstNameRequired;
    if (!formData.lastName) newErrors.lastName = t.validation.lastNameRequired;
    if (!formData.email) newErrors.email = t.validation.emailRequired;
    if (!formData.phone.number) newErrors.phone = t.validation.phoneRequired;
    if (!formData.password) newErrors.password = t.validation.passwordRequired;
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.validation.passwordMismatch;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      await api.post('/api/users/register', formData);
      setIsSubmitted(true);
      toast.success(t.success);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      
      if (errorMessage === 'This email address is already in use') {
        setErrors(prev => ({
          ...prev,
          email: t.emailExists
        }));
        toast.error(t.emailExists);
      } else if (errorMessage === 'This phone number is already in use') {
        setErrors(prev => ({
          ...prev,
          phone: t.phoneExists
        }));
        toast.error(t.phoneExists);
      } else {
        toast.error(error.response?.data?.message || t.registerError);
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        }
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
          {isSubmitted ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              py: 2 
            }}>
              <AnimatedCheckmark />
              <Typography variant="h6" align="center" gutterBottom>
                {t.success}
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                {t.redirecting}
              </Typography>
            </Box>
          ) : (
            <>
              <Typography 
                component="h1" 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ mb: { xs: 2, sm: 3 } }}
              >
                {t.title}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  name="firstName"
                  label={t.firstName}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  name="lastName"
                  label={t.lastName}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  name="email"
                  label={t.email}
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                />

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    name="countryCode"
                    label={t.countryCode}
                    value={formData.phone.countryCode}
                    onChange={handleChange}
                    error={!!errors.phone}
                    sx={{ width: '30%' }}
                    placeholder="+90"
                    inputProps={{
                      maxLength: 4
                    }}
                  />
                  <TextField
                    name="phoneNumber"
                    label={t.phone}
                    value={formData.phone.number}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    sx={{ width: '70%' }}
                    placeholder="5XX XXX XX XX"
                    inputProps={{
                      maxLength: 10,
                      pattern: '[0-9]*'
                    }}
                    type="tel"
                  />
                </Box>

                <TextField
                  fullWidth
                  margin="normal"
                  name="password"
                  label={t.password}
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={!!errors.password}
                  helperText={errors.password}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  name="confirmPassword"
                  label={t.confirmPassword}
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />

                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : t.registerButton}
                </StyledButton>
              </form>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="body2"
                  underline="hover"
                >
                  {t.alreadyHaveAccount}
                </Link>
              </Box>
            </>
          )}
        </FormContainer>
      </Box>
      <AuthFooter isMobile={isMobile} />
    </Container>
  ); 
};

export default Register;
