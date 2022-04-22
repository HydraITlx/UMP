import React from "react";
import { useState } from "react";
import "../../../styles/_pagestyles.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { ProcessCartProdutos } from "../../Requests/OrdersRequests";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Users(props) {
  const [Qtd, setQtd] = useState(0);
  const [open, setOpen] = useState(false);
  const [Alertopen, setAlertopen] = useState(false);

  const increment = () => {
    {
      if (Qtd >= 9999) {
        return;
      }
      setQtd(Number(Qtd) + 1);
    }
  };

  const decrement = () => {
    {
      setQtd(Qtd > 0 ? Qtd - 1 : 0);
    }
  };

  const onQtdChange = (e) => {
    const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
    if (rx_live.test(e.target.value)) {
      console.log(e.target.value);
      console.log(e.target.value.length);
      if (e.target.value > 9999) {
        return;
      } else {
        setQtd(e.target.value);
      }
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    let userID = sessionStorage.getItem("userID");
    userID = JSON.parse(userID);

    if (userID === null) {
      userID = localStorage.getItem("userID");
      userID = JSON.parse(userID);
    }
    ProcessCartProdutos(userID, props.UCCID, props.data, Qtd);
    setOpen(false);
    setAlertopen(true);
    setQtd(0);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertopen(false);
  };

  return (
    <section
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div className="quantity-input">
        <button
          className="quantity-input__modifier quantity-input__modifier--left"
          onClick={decrement}
        >
          &#8212;
        </button>
        <input
          className="quantity-input__screen"
          type="text"
          value={Qtd}
          onChange={onQtdChange}
        />
        <button
          className="quantity-input__modifier quantity-input__modifier--right"
          onClick={increment}
        >
          &#xff0b;
        </button>
      </div>
      <IconButton
        disabled={Qtd < 1}
        onClick={() => {
          setOpen(true);
        }}
      >
        <AddShoppingCartIcon />
      </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Deseja adicionar o produto a encomenda?"}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Deseja adicionar <b>{Qtd}</b> quantidades do produto{" "}
            <b>{props.data.Description}</b> do laboratório{" "}
            <b>{props.data.Laboratory_Name}</b> a encomenda?
          </Typography>
          <Typography gutterBottom>Deseja continuar?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleConfirm}>Continuar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={Alertopen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Produto adicionado com sucesso!
        </Alert>
      </Snackbar>
    </section>
  );
}

export default Users;
