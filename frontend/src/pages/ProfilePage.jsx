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
      toast.success('Profil başarıyla güncellendi');
    } catch (error) {
      setError(error.message || 'Profil güncellenirken bir hata oluştu');
      toast.error('Profil güncellenirken bir hata oluştu');
    }
  };

  return (
    <PageContainer>
      <StyledContainer>
        <Box sx={{ 
          width: '100%', 
          maxWidth: '450px', 
          my: 4 
        }}>
          <Paper sx={{ p: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: '#0F1111', 
                mb: 3,
                fontWeight: 400
              }}
            >
              Profil Bilgileri
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Ad"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Soyad"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
              <TextField
                fullWidth
                label="E-posta"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                margin="normal"
              />
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <TextField
                  label="Ülke Kodu"
                  name="phone.countryCode"
                  value={formData.phone.countryCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  sx={{ width: '30%' }}
                />
                <TextField
                  label="Telefon Numarası"
                  name="phone.number"
                  value={formData.phone.number}
                  onChange={handlePhoneNumberChange}
                  error={!!errors.phone?.number}
                  helperText={errors.phone?.number || "Sadece rakam giriniz (10 haneli)"}
                  inputProps={{
                    maxLength: 10,
                    pattern: '[0-9]*'
                  }}
                  disabled={!isEditing}
                  sx={{ width: '70%' }}
                />
              </Box>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                {!isEditing ? (
                  <StyledButton
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                  >
                    Düzenle
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
                      İptal
                    </StyledButton>
                    <StyledButton
                      type="submit"
                      variant="contained"
                    >
                      Kaydet
                    </StyledButton>
                  </>
                )}
              </Box>
            </form>
          </Paper>
        </Box>
      </StyledContainer>
    </PageContainer>
  );
};

export default ProfilePage; 