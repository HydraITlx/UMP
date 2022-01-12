import { DialogContent, DialogTitle } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Controls from "./Controls";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
    maxWidth: "80%",
    maxHeight: "90%",
    minWidth: "60%",
    minHeight: "60%",
  },
  DialogTitle: {
    paddingRight: "0px",
  },
}));
export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();
  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.DialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Controls.ActionButton
            color="secondary"
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon sx={{ color: "white" }} />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
