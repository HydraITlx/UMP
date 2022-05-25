import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ad0b90",
  "&:hover": {
    backgroundColor: "#6d085a",
  },
}));

export default function Buttons(props) {
  const { style, text, size, color, variant, onClick, ...other } = props;
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
