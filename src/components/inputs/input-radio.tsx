"use client";

import { Radio, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRescueAwardsStore } from "@stores/state/redeem.store";

interface Props {
  id: string;
  selectedIds: string[];
  onClick: (id: string) => void;
}

export default function InputRadio({ id, selectedIds, onClick }: Props) {
  const { redeem } = useRescueAwardsStore();
  const inputColor = redeem?.button_color || "#04DDB3";

  return (
    <FormControlLabel
      control={
        <CustomRadio
          checked={selectedIds.includes(id)}
          onClick={() => onClick(id)}
          sx={{ "--custom-radio-color": inputColor }}
        />
      }
      label=""
      sx={{
        margin: 0,
        "& .MuiFormControlLabel-label": { display: "none" },
        position: "absolute",
        right: "16px",
        top: "16px",
        zIndex: "2"
      }}
    />
  );
}

const CustomRadio = styled(Radio)(() => ({
  width: 32,
  height: 32,
  padding: 0,
  
  "& .MuiSvgIcon-root": {
    fontSize: 32,
    border: "1px solid #B1B9C5",
    borderRadius: "50%",
    
  },
  "&.Mui-checked": {
    color: "var(--custom-radio-color)",
    "& .MuiSvgIcon-root": {
      border: "none",
    },
  },
  "&:not(.Mui-checked)": {
    color: "transparent",
    background: "#fff",
  },
}));
