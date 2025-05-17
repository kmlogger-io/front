import { Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

interface ButtonContentProps {
  onClick?: () => void;
  isLoading: boolean;
  text: string;
  loadingText: string;
  disabled?: boolean;
}

export default function ButtonContent({
  onClick,
  isLoading,
  text,
  loadingText,
  disabled = false,
}: ButtonContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={isLoading || disabled}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {isLoading ? loadingText : text}
      </Button>
    </motion.div>
  );
}
