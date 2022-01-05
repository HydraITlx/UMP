import "../styles/index.scss";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { runInAction } from "mobx";
import UserStore from "./Store/UserStore";
import Spinner from "./Spinner/Spinner";
import Login from "./Login/Login.Component";
import HomePage from "./HomePage/HomePage";
import PrivateRoute from "./Helpers/PrivateRoute";
import NavBar from "./NavBar/NavBar";
import { validateToken } from "./Requests/LoginRequests";
import Group from "./Group/Group";
//import * as apiService from "./components/Users/Services/ApiService";

function App() {
  const [shouldNavigate, setshouldNavigate] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    const AuthPromise = validateToken();
    console.log("AQUII MALARDO");
    console.log(AuthPromise);
    handleTokenPromise(AuthPromise);

    console.log("teste");
    // Your code here
  }, []);

  const handleTokenPromise = (AuthPromise) => {
    if (AuthPromise === undefined) {
      return;
    }

    AuthPromise.then((response) => {
      console.log(response);
      if (response !== undefined) {
        if (response.status === "TokenNok") {
          console.log(response.username);
          runInAction(() => {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
            UserStore.username = "";
          });
          setshouldNavigate(false);
        } else {
          runInAction(() => {
            UserStore.loading = false;
            UserStore.isLoggedIn = true;
            UserStore.isAdmin = response.is_admin;
            UserStore.username = response.username;
          });
          setshouldNavigate(true);
        }
      }
    });

    return shouldNavigate;
  };

  useEffect(() => {
    if (UserStore.isLoggedIn) {
      navigate("/home");
    }
  }, [shouldNavigate]);

  return (
    <>
      <main id="root">
        {UserStore.loading && (
          <section>
            <div
              style={{
                alignContent: "center",
                marginTop: "20%",
              }}
            >
              <Spinner />
            </div>
          </section>
        )}
        <div>
          {UserStore.isLoggedIn && (
            <>
              <section>
                <NavBar />
              </section>
            </>
          )}

          {!UserStore.loading && (
            <section>
              <Routes>
                <Route path="/" element={<Login />} />

                <Route path="*" element={<Login />} />
                <Route
                  element={
                    <PrivateRoute
                      isLogged={UserStore.isLoggedIn}
                      shouldNavigate={shouldNavigate}
                    />
                  }
                >
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/group" element={<Group />} />
                </Route>
              </Routes>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default observer(App);
