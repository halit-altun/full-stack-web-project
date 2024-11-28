import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Dialog,
  TextField,
  IconButton,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddresses } from '../contexts/AddressContext';
import { useNavigate, useLocation } from 'react-router-dom';
import addressService from '../services/addressService';
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
  flexDirection: 'column'
}));

const AddressCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  position: 'relative',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const AddressForm = ({ open, handleClose, editAddress }) => {
  const { addAddress, setAddresses } = useAddresses();
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    district: '',
    postalCode: ''
  });

  useEffect(() => {
    if (editAddress) {
      setFormData({
        title: editAddress.title || '',
        address: editAddress.fullAddress || '',
        city: editAddress.city || '',
        district: editAddress.district || '',
        postalCode: editAddress.postalCode || ''
      });
    } else {
      // Reset form when closed
      setFormData({
        title: '',
        address: '',
        city: '',
        district: '',
        postalCode: ''
      });
    }
  }, [editAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editAddress) {
        // Update operation
        const response = await addressService.updateAddress(editAddress._id, formData);
        setAddresses(prevAddresses => 
          prevAddresses.map(addr => 
            addr._id === editAddress._id ? response.address : addr
          )
        );
        toast.success('Adres başarıyla güncellendi');
      } else {
        // Add new address
        const response = await addressService.createAddress(formData);
        addAddress(response.address);
        toast.success('Adres başarıyla eklendi');
      }
      handleClose();
    } catch (error) {
      toast.error(error.message || 'İşlem sırasında bir hata oluştu');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {editAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Adres Başlığı"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Açık Adres"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            margin="normal"
            multiline
            rows={3}
            required
          />
          <TextField
            fullWidth
            label="Şehir"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="İlçe"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Posta Kodu"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            margin="normal"
            required
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              onClick={handleClose}
              sx={{
                backgroundColor: 'transparent',
                border: '1px solid #D5D9D9',
                color: '#0F1111',
                '&:hover': {
                  backgroundColor: '#F7FAFA',
                  border: '1px solid #D5D9D9'
                },
                '&:focus': {
                  outline: 'none !important',
                  boxShadow: 'none !important'
                },
                '&.MuiButton-root': {
                  outline: 'none !important'
                },
                textTransform: 'none'
              }}
            >
              İptal
            </Button>
            <Button
              type="submit"
              sx={{
                backgroundColor: '#FFD814',
                color: '#0F1111',
                '&:hover': {
                  backgroundColor: '#F7CA00'
                },
                '&:focus': {
                  outline: 'none !important',
                  boxShadow: 'none !important'
                },
                '&.MuiButton-root': {
                  outline: 'none !important'
                },
                textTransform: 'none'
              }}
            >
              {editAddress ? 'Güncelle' : 'Ekle'}
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

const AddressesPage = () => {
  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get('redirect');

  const { addresses, setAddresses } = useAddresses();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await addressService.getAddresses();
        setAddresses(response.addresses);
      } catch (error) {
        toast.error('Adresler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [setAddresses]);

  const handleEdit = (address) => {
    setEditingAddress(address);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setEditingAddress(null);
    }, 200);
  };


  const handleDeleteAddress = async (addressId) => {
    if (!addressId || typeof addressId !== 'string' || !addressId.match(/^[0-9a-fA-F]{24}$/)) {
      toast.error('Geçersiz adres ID\'si');
      return;
    }

    try {
      await addressService.deleteAddress(addressId);
      setAddresses(prevAddresses => 
        prevAddresses.filter(address => address._id !== addressId)
      );
      toast.success('Adres başarıyla silindi');
    } catch (error) {
      toast.error(error.message || 'Adres silinirken bir hata oluştu');
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <StyledContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <CircularProgress />
          </Box>
        </StyledContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <StyledContainer>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
            Adreslerim
          </Typography>
          <Box sx={{ mb: 3 }}>
            <StyledButton
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Yeni Adres Ekle
            </StyledButton>
          </Box>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {addresses.map((address) => (
              <Grid item xs={12} sm={6} md={4} key={address.id}>
                <AddressCard>
                  <Typography variant="h6" gutterBottom>
                    {address.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {address.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {address.district}, {address.city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {address.postalCode}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <IconButton 
                      onClick={() => handleEdit(address)} 
                      size="small"
                      sx={{
                        '&:focus': {
                          outline: 'none'
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDeleteAddress(address._id)} 
                      size="small" 
                      color="error"
                      sx={{
                        '&:focus': {
                          outline: 'none'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </AddressCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </StyledContainer>

      <AddressForm
        open={openDialog}
        handleClose={handleClose}
        editAddress={editingAddress}
      />
    </PageContainer>
  );
};

export default AddressesPage; 