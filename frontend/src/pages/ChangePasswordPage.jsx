import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import StyledButton from '../components/Common/StyledButton';
import AuthFooter from '../components/Auth/AuthFooter';
import AnimatedCheckmark from '../components/Common/AnimatedCheckmark';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../contexts/LanguageContext';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { language } = useLanguage();
  const t = translations[language]?.changePassword || {
    title: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    changeButton: 'Change Password',
    success: 'Your password has been changed successfully',
    loginAgain: 'Please login again with your new password',
    passwordMismatch: 'New passwords do not match',
    changeError: 'Failed to change password'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    try {
      await api.post('/api/users/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      setIsSubmitted(true);
      setTimeout(() => {
        dispatch(logout());
        navigate('/login');
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.message || t.changeError);
      toast.error(error.response?.data?.message || t.changeError);
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
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          {!isSubmitted ? (
            <>
              <Typography component="h1" variant="h5" gutterBottom>
                {t.title}
              </Typography>
              
              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label={t.currentPassword}
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label={t.newPassword}
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label={t.confirmPassword}
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                />

                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  {t.changeButton}
                </StyledButton>
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
              <Typography variant="h6" align="center" gutterBottom>
                {t.success}
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                {t.loginAgain}
              </Typography>
            </Box>
          )} 
        </Paper>
      </Box>
      <AuthFooter isMobile={isMobile} />
    </Container>
  );
};

export default ChangePasswordPage;
