import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme, Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { AddressProvider } from './contexts/AddressContext';
import { LanguageProvider } from './contexts/LanguageContext';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';

const theme = createTheme({
  // Theme settings here
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <AddressProvider>
                <LanguageProvider>
                  <ThemeProvider theme={theme}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      minHeight: '100vh'
                    }}>
                      <AppRoutes />
                    </Box>
                  </ThemeProvider>
                </LanguageProvider>
              </AddressProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;