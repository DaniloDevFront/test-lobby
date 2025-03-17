"use client";

import Image from "next/image";
import { Box, Typography } from '@mui/material';
import { useRescueAwardsStore } from "@stores/state/redeem.store";

export default function StepSuccess() {
  const { redeem } = useRescueAwardsStore()

  return (
    <Box sx={{
      paddingTop: '63.5px',
      textAlign: "center",
    }}>
      <Image 
        src={redeem?.logo_url || '/logo.webp'} 
        alt="Logo"
        layout="intrinsic" 
        width={189} 
        height={54} 
        priority
      />

      <Typography variant="h1" fontSize={40} fontWeight={600} color="#353535" mt='40px' mb='0'>
        Presente resgatado! 🎉🥳
      </Typography>

      <Typography variant="h6" fontSize={20} fontWeight={400} lineHeight={1.6} color="#64748B" mt='24px' mb="0">
        Seu pedido está em andamento!
      </Typography>

      <Typography variant="h6" fontSize={20} fontWeight={400} lineHeight={1.6} color="#64748B" mt='4px' mb="0">
      E não se preocupe, as alterações de status do envio chegam todas em seu e-mail!
      </Typography>
    </Box>
  );
}
