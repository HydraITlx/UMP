import React from "react";
import {
  FormControl,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

export default function Select(props) {
  const { name, value, error = null, onChange, options, disabled } = props;

  return (
    <FormControl variant="standard" {...(error && { error: true })}>
      <MuiSelect
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
