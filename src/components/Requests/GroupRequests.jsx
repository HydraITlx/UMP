export function getGroups() {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
  };

  return getGroupPromise(
    process.env.REACT_APP_GET_PERMISSIONGROUPS,
    requestOptions
  );
}

function getGroupPromise(RequestUrl, requestOptions) {
  return fetch(RequestUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function onHandleDelete(groupip) {
  let data = {
    group_Id: groupip,
  };

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(data),
  };
  getGroupPromise(process.env.REACT_APP_DELETE_GROUP, requestOptions);
}

export function onHandleInsert(values) {
  const body = {
    createnew: true,
    group_Id: values.value,
    group_description: values.label,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };
  return getGroupPromise(
    process.env.REACT_APP_MANAGE_PERMISSIONS,
    requestOptions
  );
}

export function onHandleUpdate(values) {
  const body = {
    createnew: false,
    group_Id: values.value,
    group_description: values.label,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
    body: JSON.stringify(body),
  };
  getGroupPromise(process.env.REACT_APP_MANAGE_PERMISSIONS, requestOptions);
}
