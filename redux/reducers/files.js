import { SET_FILES, RESET_FILES } from "../constants";

const initialFilesState = [];

export const filesReducer = (state = initialFilesState, action) => {
  switch (action.type) {
    case SET_FILES: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
