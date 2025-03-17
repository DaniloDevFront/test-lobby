"use client";

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function NotFound() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%", 
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        background: "#f5f5f5",
      }}
    >
      <Box 
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: "center",
          gap: '20px'
        }
      }>
        <Stack alignItems='center' justifyContent='center' gap='64px'>
          <Image
            src={'/logo.webp'}
            alt="Logo"
            layout="intrinsic" 
            width={189} 
            height={54} 
            priority
          />

          <Image 
            src='/error.svg' 
            alt="Logo"
            layout="intrinsic" 
            width={500} 
            height={200} 
            priority
          />
        </Stack>

        <Stack textAlign='center' gap='16px'>
          <Typography variant="h1" fontSize={40} fontWeight={600} color="#22007F" m='0'>
            Oops! Página não encontrada.
          </Typography>

          <Typography variant="h6" fontSize={20} fontWeight={400} lineHeight={1.6} color="#64748B" m='0'>
            Parece que você explorou demais, e acabou se perdendo.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
