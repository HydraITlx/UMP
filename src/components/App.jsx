import "../styles/index.scss";
import UserStore from "./Store/UserStore";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import Spinner from "./Spinner/Spinner";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login/Login.Component";

function App() {
  useEffect(() => {
    console.log("teste");
    // Your code here
  }, []);

  return (
    <>
      <div id="root">
        <section></section>
        <main>
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

          <section>
            <Routes>
              {UserStore.isLoggedIn && <></>}

              {!UserStore.isLoggedIn && (
                <Route path="*" element={<Login />}></Route>
              )}
            </Routes>
          </section>
        </main>
      </div>
    </>
  );
}

export default observer(App);
