import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

try {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    initialState.user = parsedUser;
    initialState.isAuthenticated = true;
  }
} catch (error) {
  console.error('Error parsing user from localStorage:', error);
  localStorage.removeItem('user'); // Clear corrupted data
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const userData = await authService.login(credentials);
      return userData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Giriş başarısız');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;