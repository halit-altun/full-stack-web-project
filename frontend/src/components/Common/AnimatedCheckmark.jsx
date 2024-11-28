import { styled, keyframes } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const checkAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const AnimatedCheckmark = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  fontSize: '64px',
  color: '#00a65a',
  margin: '16px 0',
  animation: `${checkAnimation} 0.5s ease-in-out`,
}));

export default AnimatedCheckmark; 