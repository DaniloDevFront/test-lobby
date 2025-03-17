"use client";
import { Button } from "@mui/material";
import { useRescueAwardsStore } from "@stores/state/redeem.store";

interface Props {
  text: string;
  onClick: () => void;
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
}

export default function ButtonPrimary({ text, onClick,  width = "auto", height = "43px", disabled = false}: Props) {
  const {redeem } = useRescueAwardsStore();
  const btnColor = redeem?.button_color || "#22007f";

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: width,
        height: height,
        padding: "12px 20px",
        borderRadius: "61px",
        fontSize: "14px",
        fontWeight: 600,
        color: "#FFFFFF",
        textTransform: "capitalize",
    
        backgroundColor: btnColor,
        "&:hover": {
          backgroundColor: btnColor, 
          opacity: "90%"
        },
        "&:disabled": {
          backgroundColor: btnColor,
          opacity: "25%",
          color: "#FFFFFF"
        },
      }}
    >
       {text}
    </Button>
  );
}
