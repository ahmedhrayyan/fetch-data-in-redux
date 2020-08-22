const baseUrl = "";

function callApi(endpoint, needAuth = false, config = {}) {
  // add api credentials here
  const token = localStorage.getItem("token");
  if (needAuth && token) {
    // if there is headers in config, don't override it
    if (config.headers) {
      Object.assign(config.headers, {
        Authorization: `Bearer ${token}`,
      });
    } else {
      Object.assign(config, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  return fetch(baseUrl + endpoint, config)
    .then((response) => {
      return response.json().then((data) => ({ data, response }));
    })
    .then(({ data, response }) => {
      if (!response.ok) {
        return Promise.reject(data);
      }

      return data;
    });
}

export const CALL_API = Symbol("Call API");
const apiService = () => (next) => (action) => {
  const call = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (typeof call === "undefined") {
    return next(action);
  }

  let {
    endpoint,
    types,
    needAuth = false,
    config = {},
    onSuccess = null,
    onFailure = null,
  } = call;
  const [requestType, successType, errorType] = types;
  // dispatching the request
  next({
    type: requestType,
  });

  return callApi(endpoint, needAuth, config)
    .then((response) => {
      if (typeof onSuccess === "function") {
        onSuccess(response);
      }
      return next({
        receivedAt: Date.now(),
        payload: response,
        type: successType,
      });
    })
    .catch((error) => {
      if (typeof onFailure === "function") {
        onFailure(error);
      }
      return next({
        error: error.message,
        type: errorType,
      });
    });
};

export default apiService;
