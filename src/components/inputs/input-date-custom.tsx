"use client";

import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type Props = TextFieldProps & {
  isShrink?: boolean;
};

const InputDateCustom: React.FC<Props> = ({ value = "", ...props }) => {
  return (
    <TextField
      {...props}
      type="date"
      fullWidth
      variant="standard"
      value={value}
      slotProps={{
        input: {
          sx: {
            fontSize: "14px",
            "&:before": { borderWidth: "0.5px" },
            "&:hover:not(.Mui-disabled, .Mui-error):before": { borderWidth: "0.5px" },
            "&:after": { borderWidth: "0.5px" },
          },
        },
        inputLabel: {
          sx: { color: "#B1B9C5", fontSize: "14px" },
          shrink: true,
        },
      }}
    />
  );
};

export default InputDateCustom;
