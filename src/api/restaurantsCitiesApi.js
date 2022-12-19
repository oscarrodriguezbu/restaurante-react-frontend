import axios from "axios";

const restaurantsCitiesApi = axios.create({
  baseURL: "https://developers.zomato.com/api",
});

// CONFIGURAR INTERCEPTORES
restaurantsCitiesApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "user-key": "2ad63f94902019632381f2df301a60cc",
    Accept: "application/json",
  };

  return config;
});

export default restaurantsCitiesApi;
