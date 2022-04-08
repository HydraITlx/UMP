export function getUCCAccess() {
  let body = {
    process: 2,
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
    process.env.REACT_APP_LABUCCACCESS_MANAGEMENT,
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

export function getLabOptions() {
  let body = {
    process: 1,
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
    process.env.REACT_APP_LABUCCACCESS_MANAGEMENT,
    requestOptions
  );
}

export function getUCCOptions() {
  let body = {
    process: 3,
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
    process.env.REACT_APP_LABUCCACCESS_MANAGEMENT,
    requestOptions
  );
}

export function updateUCCOptions(data) {
  console.log(data);
  let body = {
    process: 4,
    ID: data.ID,
    Laboratory_ID: data.Laboratory_ID,
    UCC_ID: data.UCC_ID,
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
    process.env.REACT_APP_LABUCCACCESS_MANAGEMENT,
    requestOptions
  );
}

export function InsertUCCOptions(data) {
  console.log(data);
  let body = {
    process: 5,
    ID: data.ID,
    Laboratory_ID: data.Laboratory_ID,
    UCC_ID: data.UCC_ID,
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
    process.env.REACT_APP_LABUCCACCESS_MANAGEMENT,
    requestOptions
  );
}

export function DeleteUCCOptions(data) {
  console.log("WHAASDHASDHASHDHASHD");
  console.log(data);
  let body = {
    process: 6,
    ID: data.ID,
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
    process.env.REACT_APP_LABUCCACCESS_MANAGEMENT,
    requestOptions
  );
}
