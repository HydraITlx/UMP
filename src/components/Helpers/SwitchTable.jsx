import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { purple } from "@material-ui/core/colors";

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
})(Switch);

export default function SwitchLabels(props) {
  return (
    <PurpleSwitch
      name={props.name}
      disabled={props.disabled}
      id={props.id}
      onChange={props.onChange}
      checked={props.value}
      //defaultChecked={props.value}
    />
  );
}
