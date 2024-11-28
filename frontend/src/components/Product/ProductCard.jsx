import { Card, CardMedia, CardContent, Typography, Box, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
  transition: 'all 0.3s ease',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    transform: 'translateY(-4px)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.04)',
      transition: 'transform .3s ease-in'
    }
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 280,
  backgroundSize: 'contain',
  transition: 'transform .3s ease-out',
  padding: '16px',
  objectFit: 'contain',
  [theme.breakpoints.down('lg')]: {
    height: 240,
  },
  [theme.breakpoints.down('md')]: {
    height: 200,
  },
  [theme.breakpoints.down('sm')]: {
    height: 160,
    padding: '8px',
    width: '100%',
    maxHeight: '200px',
  }
}));

const ProductsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  maxWidth: '1400px',
  gap: theme.spacing(3),
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2),
  },
  '@media (min-width: 1500px)': {
    maxWidth: '80%',
    margin: '0 auto'
  }
}));

export { ProductsContainer };

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = () => {
    // Scroll to top on mobile devices
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    navigate(`/product/${product._id}`);
  };

  return (
    <StyledCard onClick={handleClick}>
      <ProductImage
        component="img"
        image={product.image}
        alt={product.title}
        sx={{
          width: '100%',
          height: 280,
        }}
      />
      <CardContent sx={{ padding: '16px' }}>
        <Typography
          component="div"
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: 1.4,
            height: '44px',
            overflow: 'hidden',
            marginBottom: '8px',
            color: '#0F1111',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
            '&:hover': {
              color: '#C7511F'
            }
          }}
        >
          {product.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Rating 
            value={product.rating} 
            precision={0.1} 
            size="small" 
            readOnly 
            sx={{ color: '#f39c12' }}
          />
          <Typography 
            variant="body2" 
            sx={{ marginLeft: '4px', color: '#7f8c8d' }}
          >
            ({product.rating})
          </Typography>
        </Box>
        <Typography 
          variant="h6" 
          sx={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#e74c3c',
            marginTop: '8px'
          }}
        >
          ₺{product.price}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
