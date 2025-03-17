"use client";

import { Typography } from '@mui/material';
import FormComponent from "../form/form";

export default function Step2() {

  return (
    <>
      <Typography variant="body2"  textAlign='center' fontSize='20px' fontWeight={600} mb='40px'>
        Finalize o seu resgate
      </Typography>

      <FormComponent />
    </>
  );
}
