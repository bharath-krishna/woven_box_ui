import { SET_FILES, USER_LOGOUT } from "../constants";

export const setFiles = (files) => {
  return {
    type: SET_FILES,
    payload: files,
  };
};

export const logoutUser = () => {
  return {
    type: USER_LOGOUT,
    payload: [],
  };
};
