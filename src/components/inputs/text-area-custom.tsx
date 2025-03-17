"use client";

import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const TextAreaCustom: React.FC<TextFieldProps> = ({ value = "", ...props }) => {
  return (
    <TextField
      {...props}
      variant="standard"
      value={value}
      fullWidth
      multiline
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
        },
      }}
    />
  );
};

export default TextAreaCustom;
