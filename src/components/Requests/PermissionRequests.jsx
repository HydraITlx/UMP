export function getPermissions(pageID) {
  let userID = sessionStorage.getItem("userID");
  userID = JSON.parse(userID);

  if (userID === null) {
    userID = localStorage.getItem("userID");
    userID = JSON.parse(userID);
  }
  console.log("userID");
  console.log(userID);
  let body = {
    process: 1,
    userName: userID,
    pageID: pageID,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(
    process.env.REACT_APP_PERMISSION_MANAGEMENT,
    requestOptions
  );
}

export function checkIfAdminPermissions(pageID) {
  let userID = sessionStorage.getItem("userID");
  userID = JSON.parse(userID);

  if (userID === null) {
    userID = localStorage.getItem("userID");
    userID = JSON.parse(userID);
  }
  console.log("userID");
  console.log(userID);
  let body = {
    process: 2,
    userName: userID,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getRequestPromise(
    process.env.REACT_APP_PERMISSION_MANAGEMENT,
    requestOptions
  );
}

function getRequestPromise(RequestUrl, requestOptions) {
  return fetch(RequestUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}
