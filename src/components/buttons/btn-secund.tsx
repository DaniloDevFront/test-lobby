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

export default function ButtonSecund({ text, onClick,  width = "auto", height = "43px", disabled = false}: Props) {
  const {redeem } = useRescueAwardsStore();
  const btnColor = redeem?.button_color || "#64748B";

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
        color: btnColor,
        textTransform: "capitalize",
        
        backgroundColor: "trasnparent",
        "&:hover": {
          backgroundColor: "##F4F4F4", 
        },

        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: btnColor
      }}
    >
       {text}
    </Button>
  );
}
