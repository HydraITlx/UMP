import { useState, useEffect } from "react";
import * as React from "react";
import { runInAction } from "mobx";
import { useNavigate } from "react-router-dom";
import { doLogin, setStorage } from "../Requests/LoginRequests";
import Switch from "../Helpers/Switch";
import Button from "../Helpers/Button";
import Alert from "../Helpers/Alerts";
import userStore from "../Store/UserStore";
import logo from "../../images/logo.jpeg";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
export function Login() {
  const [rememberLogin, setrememberLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showWarning, setshowWarning] = useState(false);
  const [shouldNavigate, setshouldNavigate] = useState(false);
  const [showPassword, SetShowPassword] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/home");
    }
  }, [shouldNavigate]);

  const handleChangeUser = (prop) => (event) => {
    var val = event.target.value;
    val = val.trim();
    if (val.length > 100) {
      return;
    }
    setUsername(val);
  };

  const handleChangePassword = (prop) => (event) => {
    var val = event.target.value;
    val = val.trim();
    if (val.length > 30) {
      return;
    }
    setPassword(val);
  };

  const handleDoLogin = (username, password) => {
    if (username === "" || password === "") {
      setShowError(false);
      setshowWarning(true);
      return;
    } else {
      setShowError(false);
      setshowWarning(false);
    }

    const AuthPromise = doLogin(username, password, rememberLogin);

    setshouldNavigate(handleAuthPromise(AuthPromise));
  };

  const handleClickShowPassword = () => {
    SetShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleAuthPromise = (AuthPromise) => {
    if (AuthPromise === undefined) {
      return;
    }

    AuthPromise.then((response) => {
      if (response !== undefined) {
        if (response.status === "Authok") {
          runInAction(() => {
            userStore.loading = false;
            userStore.isLoggedIn = true;
            userStore.isAdmin = response.is_admin;
            userStore.username = response.username;
          });
          setshouldNavigate(true);
          setStorage(username, response.newToken, rememberLogin);
        } else {
          setShowError(true);
          runInAction(() => {
            userStore.loading = false;
            userStore.isLoggedIn = false;
            userStore.username = "";
          });
          setshouldNavigate(false);
        }
      }
    });

    return shouldNavigate;
  };

  const handleRememberLogin = () => {
    setrememberLogin(!rememberLogin);
  };

  return (
    <div
      className="outer"
      style={{ width: "100%", height: "100vh", backgroundsize: "100vh" }}
    >
      <div className="inner">
        <div className="form-group">
          <img className="logoImg" src={logo} alt="Logo" />
        </div>
        <div className="form-group">
          <h3>Faça login na plataforma</h3>

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Utilizador
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="username"
              value={username ? username : ""}
              onChange={handleChangeUser("username")}
              label="Password"
            />
          </FormControl>
        </div>
        <div className="form-group">
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChangePassword("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>

        {showError && (
          <div className="form-group">
            <Alert
              severity="error"
              message="Utilizador ou palavra-passe errados."
            />
          </div>
        )}
        {showWarning && (
          <div className="form-group">
            <Alert
              severity="warning"
              message="Utilizador ou palavra-passe não podem estar vazios."
            />
          </div>
        )}

        <div className="form-group ">
          <Switch
            value={rememberLogin}
            disabled={false}
            id={"remember"}
            onChange={handleRememberLogin}
            label={"Lembrar Login"}
          ></Switch>
        </div>

        <Button
          disabled={false}
          handler={() => {
            handleDoLogin(username, password);
          }}
          label="Sign in"
        />
      </div>
    </div>
  );
}

export default Login;
