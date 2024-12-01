import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Box,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import authService from '../services/authService';
import { toast } from 'react-hot-toast';
import StyledButton from '../components/Common/StyledButton';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../contexts/LanguageContext';
import AnimatedCheckmark from '../components/Common/AnimatedCheckmark';

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
  flexDirection: 'column',
  alignItems: 'center'
}));

const SuccessMessage = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: {
    xs: '100px',   
    sm: '64px',    
    md: '70px',   
    lg: '80px'     
  },
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1200,    
  minWidth: '300px',
  maxWidth: '90%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  backgroundColor: '#f0fdf4',
  color: '#166534',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  border: '1px solid #bbf7d0',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  animation: 'slideDown 0.5s ease-out',
  '@keyframes slideDown': {
    '0%': {
      opacity: 0,
      transform: 'translate(-50%, -20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate(-50%, 0)',
    },
  },
}));

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: {
      countryCode: user?.phone?.countryCode || '',
      number: user?.phone?.number || ''
    }
  });
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const t = translations[language].profile;
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('phone.')) {
      const phoneField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        phone: {
          ...prev.phone,
          [phoneField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setFormData({
        ...formData,
        phone: {
          ...formData.phone,
          number: value
        }
      });
      if (value && !/^\d{10}$/.test(value)) {
        setErrors({
          ...errors,
          phone: { number: 'Telefon numarası 10 haneli ve sadece rakamlardan oluşmalıdır' }
        });
      } else {
        const newErrors = { ...errors };
        delete newErrors.phone;
        setErrors(newErrors);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updatedUser = await authService.updateProfile(formData);
      dispatch(setUser(updatedUser));
      setIsEditing(false);
      

      setShowSuccess(true);
      toast.success(t.updateSuccess);
      
 
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      setError(error.message || t.updateError);
      toast.error(t.updateError);
    }
  };

  return (
    <>
      {/* Success Message */}
      {showSuccess && (
        <SuccessMessage>
          <AnimatedCheckmark 
            sx={{ 
              fontSize: 28,
              color: '#15803d'
            }} 
          />
          <Box>
            <Typography 
              sx={{ 
                fontWeight: 600,
                fontSize: '1rem',
                mb: 0.5
              }}
            >
              {t.updateSuccess}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#166534',
                opacity: 0.8 
              }}
            >
              {t.profileUpdated}
            </Typography>
          </Box>
        </SuccessMessage>
      )}

      <PageContainer>
        <StyledContainer>
          <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              {t.title}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label={t.firstName}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              
              <TextField
                fullWidth
                label={t.lastName}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              
              <TextField
                fullWidth
                label={t.email}
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
              />
              
              <TextField
                fullWidth
                label={t.phone}
                name="phone.number"
                value={formData.phone.number}
                onChange={handlePhoneNumberChange}
                disabled={!isEditing}
                margin="normal"
                error={!!errors.phone?.number}
                helperText={errors.phone?.number}
              />

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                {!isEditing ? (
                  <StyledButton
                    onClick={() => setIsEditing(true)}
                    variant="contained"
                  >
                    {t.editButton}
                  </StyledButton>
                ) : (
                  <>
                    <StyledButton
                      variant="outlined"
                      className="outlined"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          firstName: user?.firstName || '',
                          lastName: user?.lastName || '',
                          email: user?.email || '',
                          phone: {
                            countryCode: user?.phone?.countryCode || '+90',
                            number: user?.phone?.number || ''
                          }
                        });
                      }}
                    >
                      {t.cancelButton}
                    </StyledButton>
                    <StyledButton
                      type="submit"
                      variant="contained"
                    >
                      {t.saveButton}
                    </StyledButton>
                  </>
                )}
              </Box>
            </Box>
          </Paper>
        </StyledContainer>
      </PageContainer>
    </>
  );
};

export default ProfilePage;  