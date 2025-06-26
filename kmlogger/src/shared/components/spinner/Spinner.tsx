import { Box, CircularProgress, Typography, Fade } from '@mui/material'

interface CarregandoSpinnerProps {
  texto?: string
  show?: boolean
}

export default function CarregandoSpinner({ texto, show = true }: CarregandoSpinnerProps) {
  return (
    <Fade in={show} timeout={200}>
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        gap={1}
      >
        <CircularProgress size={16} />
        {texto && (
          <Typography variant="body2">
            {texto}
          </Typography>
        )}
      </Box>
    </Fade>
  )
}