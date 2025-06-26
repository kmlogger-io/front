import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/logo/components/Logo';
import styled from 'styled-components';

const NotFoundContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--background);
  padding: 2rem;
  text-align: center;
`;

const ErrorCode = styled(Typography)`
  font-size: 8rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const ErrorMessage = styled(Typography)`
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const StyledButton = styled(Button)`
  background: var(--primary) !important;
  color: white !important;
  padding: 12px 32px !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  border-radius: 8px !important;
  transition: all 0.2s ease !important;
  margin-top: 2rem !important;
  
  &:hover {
    background: var(--primary-hover) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(171, 71, 188, 0.3) !important;
  }
`;

const LogoContainer = styled(Box)`
  margin-bottom: 2rem;
  opacity: 0.8;
`;

export function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/auth/login');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <NotFoundContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      
      <ErrorCode variant="h1">
        404
      </ErrorCode>
      
      <ErrorMessage>
        Página não encontrada
      </ErrorMessage>
      
      <StyledButton 
        variant="contained" 
        onClick={handleGoHome}
      >
        Ir para Login
      </StyledButton>
    </NotFoundContainer>
  );
}