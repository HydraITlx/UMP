import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={() => setOpenPopup(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 12,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  return (
    <BootstrapDialog
      PaperProps={{
        sx: {
          top: "1%",
          position: "absolute",
          maxWidth: "95%",
          maxHeight: "90%",
          minWidth: "95%",
          minHeight: "90%",
        },
      }}
      aria-labelledby="customized-dialog-title"
      open={openPopup}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={() => setOpenPopup(false)}
      >
        <Typography
          style={{
            fontSize: "1.4rem",
            flexGrow: 1,
            color: "#ad0b90",
            fontWeight: 450,
          }}
        >
          {title}
        </Typography>
      </BootstrapDialogTitle>
      {children}
    </BootstrapDialog>
  );
}
