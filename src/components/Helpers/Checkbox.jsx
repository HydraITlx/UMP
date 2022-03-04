import React from "react";
import {
  FormControl,
  FormControlLabel,
  Switch as MuiCheckbox,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

export default function Checkbox(props) {
  const { name, label, value, onChange, disabled } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  const PurpleSwitch = withStyles({
    switchBase: {
      color: purple[300],
      "&$checked": {
        color: purple[500],
      },
      "&$checked + $track": {
        backgroundColor: purple[500],
      },
    },
    checked: {},
    track: {},
  })(MuiCheckbox);

  return (
    <FormControl>
      <FormControlLabel
        control={
          <PurpleSwitch
            name={name}
            color="primary"
            disabled={disabled}
            checked={value}
            onChange={(e) =>
              onChange(convertToDefEventPara(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}
