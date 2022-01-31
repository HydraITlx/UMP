import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@material-ui/styles";
import Typography from "@mui/material/Typography";
import { ImportAPI } from "../../Requests/ImportApi";

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
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    ImportAPI();
  };

  return (
    <div
      style={{
        padding: "0px 1%",
      }}
    >
      <Button
        style={{ color: "white" }}
        className={classes.tr}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Importar Misericórdias
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Deseja importar as misericórdias da plataforma CRM?"}
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Esta ação pode substituir dados anteriormente importados, o que pode
            levar a perda de informação.
          </Typography>
          <Typography gutterBottom>
            Este processo pode demorar a finalizar.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleConfirm}>Continuar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
