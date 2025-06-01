import styled from 'styled-components';
import { Box } from '@mui/material';

export const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  justify-content: center;
`;

export const HeaderSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const LogoContainer = styled(Box)`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  }
`;

export const FormCard = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background: var(--background-card);
  padding: 2rem;
  border-radius: 6px;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border);
  position: relative;
  overflow: auto;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 50%, var(--primary) 100%);
    background-size: 200% 100%;
    animation: shimmer 3s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

export const ExtraLinks = styled(Box)`
  margin-top: 1rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;

  a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 500;
    opacity: 0.8;
    transition: all 0.2s ease;

    &:hover {
      color: var(--primary);
      opacity: 1;
      text-decoration: underline;
    }
  }
`;
