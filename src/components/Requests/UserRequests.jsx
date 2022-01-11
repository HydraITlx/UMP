export function getUsers() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
  };

  return getUserPromise(process.env.REACT_APP_ALL_USER, requestOptions);
}

function getUserPromise(RequestUrl, requestOptions) {
  return fetch(RequestUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function onHandleInsertModify(values) {
  const body = {
    username: values.username,
    full_name: values.full_name,
    email: values.email,
    password: "$2a$10$j.FO2aD5oNFpkyCqNyh1DeTRwPH0BFNIlj9wkK0uczkErubIMMBRy",
    is_admin: values.is_admin,
    active: values.active,
    attempts: 0,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  getUserPromise(process.env.REACT_APP_ADD_USER, requestOptions);
}

export function onGetPagePermissions(values) {
  const body = {
    username: values.username,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  return getUserPromise(process.env.REACT_APP_USER_GROUPS, requestOptions);
}

export function onGetPageOptions(values) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
  };

  return getUserPromise(
    process.env.REACT_APP_GET_PERMISSIONGROUPS,
    requestOptions
  );
}

export function onAddPagePermission(username, RowData) {
  let body = {
    username: username,
    group_Id: RowData.group_Id,
    name: RowData.name,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  getUserPromise(process.env.REACT_APP_ADD_USERUSERGRUPO, requestOptions);
}

export function onDeletePagePermission(username, group_Id) {
  let body = {
    username: username,
    group_Id: group_Id,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };

  getUserPromise(process.env.REACT_APP_DELETE_USERUSERGRUPO, requestOptions);
}
