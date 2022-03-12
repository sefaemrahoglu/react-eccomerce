import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigins = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("accessToken");

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const get = async (route) => {
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + route);
  return data;
};

export const post = async (route, form) => {
  const { data } = await axios.post(
    process.env.REACT_APP_BASE_URL + route,
    form
  );
  return data;
};

export const deleteItem = async (route) => {
  console.log(route);
  const { data } = await axios.delete(process.env.REACT_APP_BASE_URL + route);

  return data;
};
export const put = async (route, form) => {
  const { data } = await axios.put(
    process.env.REACT_APP_BASE_URL + route,
    form
  );
  return data;
};
