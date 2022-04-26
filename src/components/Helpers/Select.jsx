import React from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
export default function SelectMui(props) {
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
    <FormControl
      style={{ minWidth: "15%" }}
      variant={variant}
      {...(error && { error: true })}
    >
      <InputLabel id="label">{label}</InputLabel>
      <Select
        variant="standard"
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
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
