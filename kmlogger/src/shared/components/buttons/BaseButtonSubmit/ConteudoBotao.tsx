import { Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

interface ConteudoBotaoProps {
  aoClicar?: () => void;
  estaCarregando: boolean;
  texto: string;
  textoCarregando: string;
}

export default function ConteudoBotao({
  aoClicar,
  estaCarregando,
  texto,
  textoCarregando,
}: ConteudoBotaoProps) {
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
        onClick={aoClicar}
        disabled={estaCarregando}
        startIcon={estaCarregando ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {estaCarregando ? textoCarregando : texto}
      </Button>
    </motion.div>
  );
}
