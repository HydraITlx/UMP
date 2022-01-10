import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import FormGroup from "@mui/material/FormGroup";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ad0b90",
  "&:hover": {
    backgroundColor: "#6d085a",
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
