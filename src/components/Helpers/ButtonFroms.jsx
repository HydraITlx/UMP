import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    backgroundColor: "#ad0b90",
    "&:hover": {
      backgroundColor: "#6d085a",
    },
  },
  label: {
    textTransform: "none",
  },
}));

export default function Button(props) {
  const { style, text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <MuiButton
      style={style}
      variant={variant || "contained"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
}
