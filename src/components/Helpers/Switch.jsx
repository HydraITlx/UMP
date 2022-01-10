import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";

const StyleSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#ad0b90",
    "&:hover": {
      backgroundColor: alpha("#ad0b90", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#ad0b90",
  },
}));

export default function SwitchLabels(props) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <StyleSwitch
            disabled={props.disabled}
            id={props.id}
            onChange={props.onChange}
            value={props.value ? props.value : false}
            defaultChecked={props.defaultChecked ? props.defaultChecked : false}
          />
        }
        label={
          <Typography style={{ fontWeight: 600, color: "#26528d" }}>
            {props.label}
          </Typography>
        }
      />
    </FormGroup>
  );
}
