import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function ButtonLab(props) {
  const {
    style,
    text,
    size,
    color,
    variant,
    onClick,
    backgroundColor,
    backgroundColorHover,
    ...other
  } = props;

  const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: backgroundColor,
    "&:hover": {
      backgroundColor: backgroundColorHover,
    },
  }));

  return (
    <ColorButton
      style={style}
      variant={variant || "contained"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
    >
      {text}
    </ColorButton>
  );
}
