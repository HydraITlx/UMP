export function ImportAPI() {
  console.log("ENTOU AQUI");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
    },
  };

  return getApiPromise(
    process.env.REACT_APP_APIIMPORT_MANAGEMENT,
    requestOptions
  );
}

function getApiPromise(RequestUrl, requestOptions) {
  fetch(RequestUrl, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((error) => console.warn(error));
}