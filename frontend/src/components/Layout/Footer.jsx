import { Box, Container, Grid, Typography, Link, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#232F3E',
  color: '#FFFFFF',
  width: '100%',
  margin: '0',
  padding: `${theme.spacing(4)} 0`,
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  backgroundColor: '#131A22',
  color: '#FFFFFF',
  padding: '20px 0',
  marginTop: 0,
  width: '100vw !important',
  margin: '0 !important',
  [theme.breakpoints.down('sm')]: {
    padding: '10px 0',
  }
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#FFFFFF',
  textDecoration: 'none',
  display: 'block',
  padding: '4px 0',
  fontSize: '0.9rem',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    padding: '3px 0',
  },
  '&:hover': {
    color: '#FF9900',
    textDecoration: 'underline',
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    marginBottom: theme.spacing(1),
  }
}));

const BackToTopButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#37475A',
  color: '#FFFFFF',
  width: '100vw !important',
  margin: '0 !important',
  padding: '15px 0',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: '#485769',
  },
  '&:focus': {
    outline: 'none',
  },
  '&.MuiButtonBase-root:focus-visible': {
    outline: 'none',
  }
}));

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <BackToTopButton 
        onClick={scrollToTop} 
        disableRipple
      >
        <KeyboardArrowUpIcon sx={{ mr: 1 }} />
        Başa Dön
      </BackToTopButton>

      <FooterContainer>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, sm: 4 }} justifyContent="center">
            {/* About Us Column */}
            <Grid item xs={6} sm={3}>
              <StyledTypography variant="h6" gutterBottom>
                Hakkımızda
              </StyledTypography>
              <Box>
                <FooterLink href="#">Kariyer</FooterLink>
              </Box>
              <Box>
                <FooterLink href="#">Blog</FooterLink>
              </Box>
              <Box>
                <FooterLink href="#">Şirket Bilgileri</FooterLink>
              </Box>
            </Grid>

            {/* Earn Money Column */}
            <Grid item xs={6} sm={3}>
              <StyledTypography variant="h6" gutterBottom>
                Para Kazanın
              </StyledTypography>
              <Box>
                <FooterLink href="#">Ürünlerinizi Satın</FooterLink>
              </Box>
              <Box>
                <FooterLink href="#">İş Ortağımız Olun</FooterLink>
              </Box>
            </Grid>

            {/* Payment Column */}
            <Grid item xs={6} sm={3}>
              <StyledTypography variant="h6" gutterBottom>
                Ödeme
              </StyledTypography>
              <Box>
                <FooterLink href="#">Ödeme Seçenekleri</FooterLink>
              </Box>
              <Box>
                <FooterLink href="#">Kargo Takibi</FooterLink>
              </Box>
            </Grid>

            {/* Help Column */}
            <Grid item xs={6} sm={3}>
              <StyledTypography variant="h6" gutterBottom>
                Yardım
              </StyledTypography>
              <Box>
                <FooterLink href="#">COVID-19</FooterLink>
              </Box>
              <Box>
                <FooterLink href="#">Kargo ve Teslimat</FooterLink>
              </Box>
              <Box>
                <FooterLink href="#">İade ve Değişim</FooterLink>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </FooterContainer>

      <FooterBottom>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}>
            © {new Date().getFullYear()} Amazing. Tüm hakları saklıdır.
          </Typography>
        </Container>
      </FooterBottom>
    </>
  );
}

export default Footer;
