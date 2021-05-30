import { SET_FILES, ADD_FILES, DELETE_FILE, USER_LOGOUT } from "../constants";

export const setFiles = (files) => {
  return {
    type: SET_FILES,
    payload: files,
  };
};

export const addFiles = (files) => {
  return {
    type: ADD_FILES,
    payload: files,
  };
};

export const deleteFile = (file) => {
  return {
    type: DELETE_FILE,
    payload: file,
  };
};

export const logoutUser = () => {
  return {
    type: USER_LOGOUT,
    payload: [],
  };
};
