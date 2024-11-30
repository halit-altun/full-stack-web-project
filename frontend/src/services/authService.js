import api from './api';

const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/api/users/login', credentials);
      
      if (response.data && response.data.token) {
        const userData = {
          token: response.data.token,
          ...response.data.user
        };
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  register: async (userData) => {
    const response = await api.post('/api/users/register', userData);
    return response;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  updateProfile: async (userData) => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('Kullanıcı oturumu bulunamadı');
      }

      const user = JSON.parse(userStr);
      if (!user.token) {
        throw new Error('Token bulunamadı');
      }

      const response = await api.put('/api/users/profile', userData, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (response.data) {
        const updatedUser = {
          ...user,
          ...response.data
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response.data;
    } catch (error) {
      console.error('Token:', localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : 'Token yok');
      throw error.response?.data || error.message;
    }
  },

  changePassword: async (passwordData) => {
    const response = await api.post('/api/users/change-password', passwordData);
    return response;
  }
};

export default authService; 