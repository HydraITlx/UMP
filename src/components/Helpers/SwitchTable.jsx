import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

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
    <StyleSwitch
      name={props.name}
      disabled={props.disabled}
      id={props.id}
      onChange={props.onChange}
      checked={props.value}
      //defaultChecked={props.value}
    />
  );
}
