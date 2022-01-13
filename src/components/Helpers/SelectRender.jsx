import React from "react";
import {
  FormControl,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  InputLabel,
} from "@mui/material";

export default function Select(props) {
  const {
    name,
    value,
    error = null,
    onChange,
    options,
    disabled,
    variant = "standard",
    label = "",
  } = props;

  return (
    <FormControl variant={variant} {...(error && { error: true })}>
      <InputLabel id="label">{label}</InputLabel>
      <MuiSelect
        id="label"
        label={label}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
      >
        <MenuItem value=" "></MenuItem>
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
