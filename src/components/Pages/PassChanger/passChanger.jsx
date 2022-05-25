import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@material-ui/styles";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const useStyles = makeStyles({
  paper: {
    position: "relative",
    margin: "auto",
    height: "100%",
    width: "500px",
    padding: "30px 20px 20px 20px",
  },
  fieldWrapper: {
    display: "flex",
    position: "relative",
    paddingBottom: "15px",
  },
  field: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "baseline",
  },
  name: {
    width: "260px",
    color: "#808285",
    fontWeight: "bold",
    textAlign: "left",
  },
  formItem__textField: {
    margin: "0 10px 10px 0",
    width: "calc(100% - 150px) !important",
  },
  input: {
    height: "10px !important",
  },
  action: {
    padding: "10px 50px 10px 30px",
  },
  leftIcon: {
    marginRight: "20px",
  },
  snack: {
    width: "100%",
    "& > * + *": {
      marginTop: 2,
    },
  },
});

const ColorButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: "#ad0b90",
  "&:hover": {
    backgroundColor: "#6d085a",
  },
}));

export default function passChanger() {
  const [oldPass, setoldPass] = useState("");
  const [oldPassError, setoldPassError] = useState(false);
  const [newPassFirst, setnewPassFirst] = useState("");
  const [newPassFirstError, setnewPassFirstError] = useState(false);
  const [newPassSecond, setnewPassSecond] = useState("");
  const [newPassSecondError, setnewPassSecondError] = useState(false);
  const [loading, setloading] = useState(false);
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const clickField = (field, value) => {
    if (field === "oldPass") {
      !value && setoldPassError(true);
    }

    if (field === "newPassFirst") {
      !value && setnewPassFirstError(true);
    }

    if (field === "newPassSecond") {
      !value && setnewPassSecondError(true);
    }
  };

  const blurField = (field) => {
    if (field === "oldPass") {
      setoldPassError(false);
    }

    if (field === "newPassFirst") {
      setnewPassFirstError(false);
    }

    if (field === "newPassSecond") {
      setnewPassSecondError(false);
    }
  };

  const setFieldValue = (field, value) => {
    if (value.length > 16) {
      return;
    }
    if (field === "oldPass") {
      !value ? setoldPassError(true) : setoldPassError(false);
      const newForm = {
        ...form,
        [field]: value,
      };
      setForm(newForm);
      setoldPass(value);
    }

    if (field === "newPassFirst") {
      !value ? setoldPassError(true) : setoldPassError(false);
      const newForm = {
        ...form,
        [field]: value,
      };
      setForm(newForm);
      setnewPassFirst(value);
    }

    if (field === "newPassSecond") {
      !value ? setoldPassError(true) : setoldPassError(false);
      const newForm = {
        ...form,
        [field]: value,
      };
      setForm(newForm);
      setnewPassSecond(value);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const validateFields = (form) => {
    if (!form.oldPass || !form.newPassFirst || !form.newPassSecond) {
      setMessage(
        `Preencha o campo - ${`${!form.oldPass ? "Password actual, " : ""}${
          !form.newPassFirst ? "Nova password, " : ""
        }${!form.newPassSecond ? "Repetir nova password, " : ""}`
          .trim()
          .replace(/,$/g, "")}!`
      );
      setVariant("warning");
      setOpen(true);
      return true;
    }

    if (
      form.newPassFirst &&
      form.newPassSecond &&
      form.newPassFirst !== form.newPassSecond
    ) {
      setMessage(
        "A nova password e confirmação da nova password não coincidem"
      );
      setVariant("warning");
      setOpen(true);
      return true;
    }

    if (form.oldPass && form.oldPass === form.newPassFirst) {
      setMessage("A nova password e a password atual coincidem");
      setVariant("warning");
      setOpen(true);
      return true;
    }

    return false;
  };

  const submit = async () => {
    const data = {
      oldPassword: form.oldPass,
      newPassword1: form.newPassFirst,
      newPassword2: form.newPassSecond,
    };

    let errorMessage;

    if (validateFields(form)) return;
    setloading(true);

    try {
      setloading(true);
      await changePassword(data);
    } catch (error) {
      errorMessage = error.response.data;
    }
  };

  const changePassword = async (data) => {
    let userID = sessionStorage.getItem("userID");
    userID = JSON.parse(userID);

    if (userID === null) {
      userID = localStorage.getItem("userID");
      userID = JSON.parse(userID);
    }

    const newData = {
      ...data,
      userName: userID,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
      },
      body: JSON.stringify(newData),
    };

    return fetch(process.env.REACT_APP_PASS_CHANGER, requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        setVariant(responseData.variant);
        setMessage(responseData.message);
        setOpen(true);

        setoldPass("");
        setnewPassFirst("");
        setnewPassSecond("");
        setloading(false);
        return responseData;
      });
  };

  // display diagnostic messages
  const snackbarMessage = (
    <Snackbar
      className={classes.nack}
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity={variant}>{message}</Alert>
    </Snackbar>
  );

  const handleClickShowPassword = (field) => {
    if (field === "oldPass") {
      setShowPasswordOld(!showPasswordOld);
    }

    if (field === "newPassFirst") {
      setShowPassword1(!showPassword1);
    }

    if (field === "newPassSecond") {
      setShowPassword2(!showPassword2);
    }
  };

  return (
    <div
      className="main-container"
      style={{ textAlign: "center", marginTop: "10%" }}
    >
      <h3 className="title" style={{ color: "#ad0b90", fontWeight: 700 }}>
        Alterar Password
      </h3>
      <Paper elevation={5} className={classes.paper}>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <label className={classes.field}>
            <span className={classes.name}>Password actual*</span>
            <TextField
              onClick={(e) => clickField("oldPass", e.target.value)}
              onBlur={() => blurField("oldPass")}
              onChange={(e) => {
                setFieldValue("oldPass", e.target.value);
              }}
              type={showPasswordOld ? "text" : "password"}
              value={oldPass}
              className={classes.formItem__textField}
              placeholder="Password actual"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="new-password"
              inputProps={{
                className: classes.input,
              }}
              error={oldPassError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Mostrar password"
                      onClick={() => handleClickShowPassword("oldPass")}
                    >
                      {showPasswordOld ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </label>
          <label className={classes.field}>
            <span className={classes.name}>Nova password *</span>
            <TextField
              onClick={(e) => clickField("newPassFirst", e.target.value)}
              onBlur={() => blurField("newPassFirst")}
              onChange={(e) => {
                setFieldValue("newPassFirst", e.target.value);
              }}
              type={showPassword1 ? "text" : "password"}
              value={newPassFirst}
              className={classes.formItem__textField}
              placeholder="Nova password"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="new-password"
              inputProps={{
                className: classes.input,
              }}
              error={newPassFirstError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Mostrar password"
                      onClick={() => handleClickShowPassword("newPassFirst")}
                    >
                      {showPassword1 ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </label>
          <label className={classes.field}>
            <span className={classes.name}>Repetir nova password *</span>
            <TextField
              onClick={(e) => clickField("newPassSecond", e.target.value)}
              onBlur={() => blurField("newPassSecond")}
              onChange={(e) => {
                setFieldValue("newPassSecond", e.target.value);
              }}
              type={showPassword2 ? "text" : "password"}
              value={newPassSecond}
              className={classes.formItem__textField}
              placeholder="Repetir nova password"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="new-password"
              inputProps={{
                className: classes.input,
              }}
              error={newPassSecondError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Mostrar password"
                      onClick={() => handleClickShowPassword("newPassSecond")}
                    >
                      {showPassword2 ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </label>
          <ColorButton
            style={{
              borderRadius: 15,
              fontSize: "18px",
            }}
            type="submit"
            variant="contained"
            className={classes.action}
            loading={loading}
          >
            <SendIcon className={classes.leftIcon} /> Alterar palavra passe{" "}
          </ColorButton>
        </form>
      </Paper>
      {snackbarMessage}
    </div>
  );
}
