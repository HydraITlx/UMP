import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import FormGroup from "@mui/material/FormGroup";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#ad0b90",
  "&:hover": {
    backgroundColor: purple[500],
  },
}));

export default function SwitchLabels(props) {
  return (
    <FormGroup>
      <ColorButton
        variant="contained"
        disabled={props.disabled}
        onClick={props.handler}
      >
        {props.label}
      </ColorButton>
    </FormGroup>
  );
}
