import api from './api';

const addressService = {
  getAddresses: async () => {
    try {
      const response = await api.get('/api/addresses');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createAddress: async (addressData) => {
    try {
      const response = await api.post('/api/addresses', addressData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateAddress: async (addressId, addressData) => {
    try {
      const response = await api.put(`/api/addresses/${addressId}`, addressData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteAddress: async (addressId) => {
    try {
      const response = await api.delete(`/api/addresses/${addressId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default addressService; 