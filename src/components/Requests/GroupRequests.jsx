export function getGroups() {
  const requestOptions = {
    method: "GET",
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

  console.log(groupip);

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
