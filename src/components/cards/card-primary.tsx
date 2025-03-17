"use client";

import React from "react";
import { Box, Card, Stack, Typography } from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';

import ButtonSecund from "../buttons/btn-secund";
import ButtonPrimary from "../buttons/btn-primary";

import { useStepStore } from "@stores/state/control-step.store";
import { useRescueAwardsStore } from "@stores/state/redeem.store";

interface Props {
  children: React.ReactNode;
}

export default function CardPrimary({children}: Props) {
  const { handleStep, step } = useStepStore();
  const { redeem, selectedAwards, isFormValid } = useRescueAwardsStore()

  const hasOptionalItems = redeem?.items?.some(item => item.optional);
  const selectedOptionalItem = redeem?.items?.some(item => item.optional && selectedAwards.includes(item.customer_product_id));

  const textButton = () => {
      switch (step) {
        case 0:
          return 'Começar!';
        default:
          return 'Continuar';
      }
  };

  const disabled = () => {
    switch (step) {
      case 1:
        return hasOptionalItems ? !selectedOptionalItem : false;
      case 2:
        return isFormValid === false;
      default:
        return false;
    }
  }

  const footer = () => {
    return (
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
        }}>
        <Typography variant="body2" color="textSecondary" fontSize='14px'>
          <CopyrightIcon sx={{ fontSize: '14px', color: "gray", verticalAlign: "middle", marginRight:"8px" }} aria-label="Copyright" />

          2025 - <strong>Empresa X</strong> em parceria com a <strong>Lobby</strong>
        </Typography>
      </Box>  
    ) 
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: '40px',
        alignItems: "center",
        maxWidth: "1000px",
        width: "100%",
        minHeight: "600px",
        height: "auto",
        padding: "40px",
        position: "relative",
        borderRadius: "20px",
        boxShadow: "none",
        overflow: "hidden",
      }}  
    >
      <Box sx={{
        width:"100%",
        display:"flex",
        flexDirection:'column',
        gap: '40px'
      }}>
        {children}

        <Stack sx={{
          width: "100%",
          flexDirection: "row",
          justifyContent: step === 0 ? "center" : "flex-end", 
          gap: 2
        }}>
          { step !== 3 && step !==4 &&
            <>
              {step !== 0 && <ButtonSecund text="Voltar" onClick={()=> handleStep('prev')}/>}
              <ButtonPrimary text={textButton()} disabled={disabled()} onClick={()=> handleStep('next')}/>
            </>
          }
        </Stack>
      </Box>

      {footer()}
    </Card>
  );
}
