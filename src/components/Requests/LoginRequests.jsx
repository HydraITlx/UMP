import { runInAction } from "mobx";
import userStore from "../Store/UserStore";
export function doLogin(username, password, rememberLogin) {
  const body = {
    username: username,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getAuthPromise(process.env.REACT_APP_USER_AUTH, requestOptions);
}

export function validateToken() {
  let userToken = sessionStorage.getItem("userToken");
  userToken = JSON.parse(userToken);

  console.log("TOKEN HERE");
  console.log(userToken);

  let userID = sessionStorage.getItem("userID");
  userID = JSON.parse(userID);

  if (userToken === null) {
    userToken = localStorage.getItem("userToken");
    userToken = JSON.parse(userToken);

    userID = localStorage.getItem("userID");
    userID = JSON.parse(userID);
  }

  if (userID !== null) {
    let body = {
      username: userID,
      token: userToken,
    };

    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
      },
      body: JSON.stringify(body),
    };
    return getAuthPromise(process.env.REACT_APP_GET_TOKEN, requestOptions);
  } else {
    runInAction(() => {
      userStore.loading = false;
    });
  }
}

async function getAuthPromise(RequestUrl, requestOptions) {
  return fetch(RequestUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function setStorage(userName, userToken, rememberLogin) {
  if (rememberLogin) {
    localStorage.setItem("userToken", JSON.stringify(userToken));
    localStorage.setItem("userID", JSON.stringify(userName));
  } else {
    sessionStorage.setItem("userToken", JSON.stringify(userToken));
    sessionStorage.setItem("userID", JSON.stringify(userName));
  }
}
