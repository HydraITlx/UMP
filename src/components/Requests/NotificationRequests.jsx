function getRequestPromise(RequestUrl, requestOptions) {
  return fetch(RequestUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function MarkNotificationAsRead(rowData) {
  let body = {
    process: 2,
    ID: rowData.ID,
    username: rowData.username,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  getRequestPromise(
    process.env.REACT_APP_NOTIFICATION_MANAGEMENT,
    requestOptions
  );
}

export function GetNotificationSettings(username) {
  let body = {
    process: 3,
    username: username,
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
    process.env.REACT_APP_NOTIFICATION_MANAGEMENT,
    requestOptions
  );
}

export function ChangeNotificationSettings(username, DontSendEmail) {
  let body = {
    process: 4,
    username: username,
    DontSendEmail: DontSendEmail,
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
    process.env.REACT_APP_NOTIFICATION_MANAGEMENT,
    requestOptions
  );
}
