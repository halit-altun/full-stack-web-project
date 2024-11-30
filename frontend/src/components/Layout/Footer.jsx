import { Box, Container, Grid, Typography, Link, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TranslateIcon from '@mui/icons-material/Translate';
import { useLanguage, translations } from '../../contexts/LanguageContext';

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
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
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

const LanguageButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '2px',
  '&:hover': {
    outline: '1px solid #ffffff',
  }
}));

const FlagIcon = styled('img')({
  width: '24px',
  height: '16px',
  marginRight: '8px'
});

function Footer() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].footer;

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
        {t.backToTop}
      </BackToTopButton>

      <FooterContainer>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, sm: 4 }} justifyContent="center">
            {/* About Us Column */}
            <Grid item xs={6} sm={3}>
              <StyledTypography variant="h6" gutterBottom>
                {t.aboutUs.title}
              </StyledTypography>
              <Box>
                <FooterLink href="#">{t.aboutUs.career}</FooterLink>
              </Box>
              <Box>
                <FooterLink href="#">{t.aboutUs.blog}</FooterLink>
              </Box>
              <Box>
                <FooterLink href="#">{t.aboutUs.companyInfo}</FooterLink>
              </Box>
            </Grid>

            {/* Earn Money Column */}
            <Grid item xs={6} sm={3}>
              <StyledTypography variant="h6" gutterBottom>
                {t.earnMoney.title}
              </StyledTypography>
              <Box>
                <FooterLink href="#">{t.earnMoney.sellProducts}</FooterLink>
              </Box>
              <Box>
                <FooterLink href="#">{t.earnMoney.becomePartner}</FooterLink>
              </Box>
            </Grid>

            {/* Payment Column */}
            <Grid item xs={6} sm={3}>
              <StyledTypography variant="h6" gutterBottom>
                {t.payment.title}
              </StyledTypography>
              <Box>
                <FooterLink href="#">{t.payment.paymentOptions}</FooterLink>
              </Box>
              <Box>
                <FooterLink href="#">{t.payment.trackShipment}</FooterLink>
              </Box>
            </Grid>

            {/* Help Column */}
            <Grid item xs={6} sm={3}>
              <StyledTypography variant="h6" gutterBottom>
                {t.help.title}
              </StyledTypography>
              <Box>
                <FooterLink href="#">{t.help.covid19}</FooterLink>
              </Box>
              <Box>
                <FooterLink href="#">{t.help.shippingDelivery}</FooterLink>
              </Box>
              <Box>
                <FooterLink href="#">{t.help.returnsExchange}</FooterLink>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </FooterContainer>

      <FooterBottom>
        <LanguageButton onClick={toggleLanguage}>
          <FlagIcon 
            src={language === 'tr' ? '/src/assets/img/flag-tr.png' : '/src/assets/img/flag-en.png'} 
            alt={language === 'tr' ? 'Türkçe' : 'English'} 
          />
          <Typography variant="body2" color="white">
            {language === 'tr' ? 'Türkçe' : 'English'}
          </Typography>
        </LanguageButton>
        <Container 
          maxWidth="lg" 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: '16px'
          }}
        >
          <Typography 
            variant="body2" 
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              textAlign: 'center'
            }}
          >
            {t.copyright.replace('{year}', new Date().getFullYear())}
          </Typography>
        </Container>
      </FooterBottom>
    </>
  );
}

export default Footer;
