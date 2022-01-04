import { useState } from "react";
import logo from "../../images/logo.jpeg";
import * as apiService from "../Requests/LoginRequests";
import Switch from "../Helpers/Switch";
import Button from "../Helpers/Button";
import Alert from "../Helpers/Alerts";

export function Login() {
  const [rememberLogin, setrememberLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showWarning, setshowWarning] = useState(false);

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
    console.log("teste");

    if (username === "" || password === "") {
      setShowError(false);
      setshowWarning(true);
      return;
    } else {
      setShowError(false);
      setshowWarning(false);
    }

    console.log(apiService.doLogin(username, password, rememberLogin));
  };

  const handleRememberLogin = () => {
    console.log("testetee");
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
          <input
            type="username"
            className="form-control"
            placeholder="Utilizador"
            value={username ? username : ""}
            onChange={handleChangeUser("username")}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Palavra-passe"
            value={password}
            onChange={handleChangePassword("password")}
          />
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
