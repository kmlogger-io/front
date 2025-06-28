import { Box, CircularProgress, Typography, Fade } from '@mui/material'

interface LoadingSpinnerProps {
  text?: string
  show?: boolean
}

export default function LoadingSpinner({ text, show = true }: LoadingSpinnerProps) {
  return (
    <Fade in={show} timeout={200}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <CircularProgress size={16} />
        {text && (
          <Typography variant="body2">
            {text}
          </Typography>
        )}
      </Box>
    </Fade>
  )
}