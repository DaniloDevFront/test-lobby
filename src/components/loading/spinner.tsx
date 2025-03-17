"use client";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingSpinner() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress size={50} thickness={4} color="primary" />
    </Box>
  );
}

export default LoadingSpinner;
