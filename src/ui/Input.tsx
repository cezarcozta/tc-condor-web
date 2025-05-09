"use client";

import { Box, InputAdornment, InputLabel, TextField } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

interface IInputText {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  value: unknown;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string | boolean;
  icon?: ReactNode;
  endAdornment?: string;
  htmlInput?: {
    min?: string | number | undefined;
    max?: string | number | undefined;
  };
}

export default function Input({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  icon,
  disabled,
  htmlInput,
  type,
  endAdornment,
}: IInputText) {
  return (
    <Box width="100%">
      <InputLabel
        htmlFor={id}
        sx={{
          color: "primary.dark",
          fontWeight: "bold",
          fontSize: "0.75rem",
          mb: "0.5rem",
        }}
      >
        {label}
      </InputLabel>
      <TextField
        id={id}
        fullWidth
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error}
        disabled={disabled}
        size="small"
        variant="outlined"
        sx={{ mb: 1 }}
        slotProps={{
          input: {
            startAdornment: icon && (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
            endAdornment,
          },
          htmlInput,
        }}
      />
    </Box>
  );
}
