import { SET_FILES } from "../constants";

export const setFiles = (files) => {
  return {
    type: SET_FILES,
    payload: files,
  };
};
