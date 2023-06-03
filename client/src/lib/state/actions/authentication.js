import { LOGIN, LOGOUT } from "./actionTypes";

export const handleLogin = (user) => {
  return {
    type: LOGIN,
    payload: { user: user, error: null },
  };
};

export const handleAuthenticationErrors = (err) => {
  return {
    type: LOGIN,
    payload: { user: null, error: err },
  };
};

export const handleLogout = () => {
  return {
    type: LOGOUT,
  };
};
