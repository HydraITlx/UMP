export function getUCCs() {
    let body = {
        process = 5
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_APITOKEN}`,
      },
      body: JSON.stringify(body),
    };
  
    return getGroupPromise(process.env.REACT_APP_UCC_MANAGEMENT,requestOptions);
  }
  
  function getGroupPromise(RequestUrl, requestOptions) {
    return fetch(RequestUrl, requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        return responseData;
      })
      .catch((error) => console.warn(error));
  }
  