import { Error } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

export default function ErrorIcon() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" height={36}>
        <Error color="error" />
      </Box>
    </motion.div>
  );
}
