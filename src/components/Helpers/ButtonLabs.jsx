import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

export default function Button(props) {
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

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(0.5),
      backgroundColor: backgroundColor,
      "&:hover": {
        backgroundColor: backgroundColorHover,
      },
    },
    label: {
      textTransform: "none",
    },
  }));

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
