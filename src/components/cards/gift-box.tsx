"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Badge, Box, Stack, Typography } from "@mui/material";
import InputRadio from "@components/inputs/input-radio";
import { useRescueAwardsStore } from "@stores/state/redeem.store";

interface Props {
  id: string;
  title: string;
  award: string;
  isOptional: boolean;
  selectedIds: string[];
  onSelect: (id: string) => void;
}

export default function GiftBox({ id, title, award, isOptional = true, selectedIds, onSelect }: Props) {
  const { redeem } = useRescueAwardsStore()

  useEffect(() => {
    if (!isOptional && !selectedIds.includes(id)) {
      onSelect(id);
    }
  }, [isOptional, id, selectedIds, onSelect]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: "6px",
        border: '0.5px solid #D8DCE2',
      }}
    >   
      {isOptional && (
        <Badge
          badgeContent={
            <Typography 
              fontSize={12} 
              fontWeight={500} 
              sx={{ color: "#fff", backgroundColor: redeem?.button_color, padding: "4px 8px", borderRadius: "8px" }}
            >
              Opcional
            </Typography>
          }
          sx={{
            position: "absolute",
            left: "39px",
            top: "18px",
            zIndex: 2,
          }}
        />
      )}
      
      <Stack flexDirection="column" justifyContent="space-between" width="100%" p="16px">
        <InputRadio id={id} selectedIds={selectedIds} onClick={isOptional ? onSelect : () => {}} />

        <Image src={award} width={261} height={261} alt="Descrição da imagem" 
          style={{
            width: "100%", 
            height: "auto",
            objectFit: "contain",
          }} 
        />
        
        <Stack mt="20px" alignItems="center">
          <Typography variant="body2"  textAlign='center' fontSize='16px' fontWeight={600}>
            {title}  
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
