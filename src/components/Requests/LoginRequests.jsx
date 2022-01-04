import axios from "axios";
import { runInAction } from "mobx";
import userStore from "../Store/UserStore";
import { nanoid } from "nanoid";
import { useState } from "react";

export function doLogin(username, password, rememberLogin) {
  const body = {
    username: username,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    url: process.env.REACT_APP_USER_AUTH,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    data: JSON.stringify(body),
  };

  makeGetRequest();
}

async function makeGetRequest() {
  console.log("?entrou");
  let res = await axios.get("http://webcode.me");

  let data = res.data;
  console.log(data);
}

async function AuthRequest() {
  axios(requestOptions)
    .then((response) => {
      if (response.data.status === "Authok") {
        runInAction(() => {
          userStore.showError = false;
          userStore.showWarning = false;
          userStore.loading = false;
          userStore.isLoggedIn = true;
          userStore.isAdmin = response.data.is_admin;
          userStore.username = response.data.username;
        });
      }
      console.log("aqui");
      runInAction(() => {
        userStore.showError = false;
        userStore.showWarning = false;
        userStore.loading = false;
        userStore.isLoggedIn = true;
        userStore.isAdmin = response.data.is_admin;
        userStore.username = response.data.username;
      });
    })
    .catch((err) => {
      runInAction(() => {
        userStore.showError = true;
        userStore.showWarning = false;
        userStore.loading = false;
        userStore.isLoggedIn = false;
        userStore.username = "";
      });
      console.log("aqui");
      console.log(err);
    });
}
