import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../api";
import { getAuthError } from "../helpers/getErrors";
import { onChecking, onLogin, onLogout, clearErrorMessage, clearRestaurantsHsitory } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await userApi.post("/auth", { email, password });
      renewToken(data);
    } catch (error) {      
      if (error.response.data.msg) {
        dispatch(onLogout(error.response.data.msg));
      } else if (error.response.data.errors) {
        const errors = getAuthError(error.response.data.errors);
        dispatch(onLogout(errors));
      } else {
        dispatch(onLogout("Credenciales incorrectas"));
      }
      //   setTimeout(() => {
      //     dispatch(clearErrorMessage());
      //   }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await userApi.post("/auth/new", {
        name,
        email,
        password,
      });
      renewToken(data);
    } catch (error) {
      if (error.response.data.msg) {
        dispatch(onLogout(error.response.data.msg));
      } else if (error.response.data.errors) {
        const errors = getAuthError(error.response.data.errors);
        dispatch(onLogout(errors));
      } else {
        dispatch(onLogout("Algo salió mal."));
      }
      //   setTimeout(() => {
      //     dispatch(clearErrorMessage());
      //   }, 10);
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(clearRestaurantsHsitory());
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await userApi.get("/auth/renew");
      renewToken(data);
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const renewToken = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("token-init-date", new Date().getTime());
    dispatch(onLogin({ name: data.name, uid: data.uid }));
  };

  return {
    //Propiedades
    status,
    user,
    errorMessage,
    //Metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  };
};
