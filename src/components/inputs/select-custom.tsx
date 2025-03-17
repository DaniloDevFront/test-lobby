"use client";

import React from "react";
import { MenuItem, Select, SelectProps } from "@mui/material";

const SelectCustom: React.FC<SelectProps> = ({ value, label, children, ...props }) => {
  return (
    <Select
      {...props}
      variant="standard"
      value={value || ""}
      fullWidth
      displayEmpty
      onChange={props.onChange}
      sx={{
        minHeight: "45px",
        fontSize: "14px",
        "&:before": { borderWidth: "0.5px" },
        "&:hover:not(.Mui-disabled, .Mui-error):before": { borderWidth: "0.5px" },
        "&:after": { borderWidth: "0.5px" },
        "& .MuiInputBase-input": {
          color: value ? "#000" : "#B1B9C5", 
        },
      }}
    >
      <MenuItem value="" disabled sx={{fontSize: '14px'}}>
        {label}
      </MenuItem>

      {children}
    </Select>
  );
};

export default SelectCustom;
