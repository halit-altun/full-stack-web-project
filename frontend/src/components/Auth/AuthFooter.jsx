import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';

const FooterLink = ({ href, children, isMobile }) => (
  <Link 
    href={href} 
    variant={isMobile ? "caption" : "body2"}
    sx={{ 
      textDecoration: 'none',
      color: '#0066c0',
      '&:hover': {
        textDecoration: 'underline',
        color: '#c45500'
      }
    }}
  >
    {children}
  </Link>
);

const AuthFooter = ({ isMobile }) => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        pt: 3,
        width: '100%',
        textAlign: 'center'
      }}
    >
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: { xs: 2, sm: 3 },
          pb: 2,
          flexWrap: 'wrap',
          width: '100%'
        }}
      >
        <FooterLink href="#" isMobile={isMobile}>Kullanım Koşulları</FooterLink>
        <FooterLink href="#" isMobile={isMobile}>Gizlilik Bildirimi</FooterLink>
        <FooterLink href="#" isMobile={isMobile}>Yardım</FooterLink>
      </Box>

      <Typography 
        variant={isMobile ? "caption" : "body2"} 
        color="text.secondary" 
        sx={{ pb: 2, width: '100%', textAlign: 'center' }}
      >
        © 2024 Amazing. Tüm hakları saklıdır.
      </Typography>
    </Box>
  );
};

export default AuthFooter; 