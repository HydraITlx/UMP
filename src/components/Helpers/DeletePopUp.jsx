import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@material-ui/styles";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  tr: {
    backgroundColor: "#ad0b90",
    "&:hover": {
      backgroundColor: "#6d085a",
    },
  },
});

export default function AlertDialogSlide(props) {
  const { open, handleCancel, handleConfirm, recordForDelete } = props;
  const classes = useStyles();

  console.log(recordForDelete);
  return (
    <div
      style={{
        padding: "0px 1%",
      }}
    >
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Deseja apagar esta linha?"}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Esta ação irá eliminar a linha selecionada.
          </Typography>
          <Typography gutterBottom>Deseja continuar?.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={() => handleConfirm(recordForDelete)}>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
