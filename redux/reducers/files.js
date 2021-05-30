import { SET_FILES, DELETE_FILE, ADD_FILES } from "../constants";

const initialFilesState = [];

export const filesReducer = (state = initialFilesState, action) => {
  switch (action.type) {
    case SET_FILES: {
      return action.payload;
    }
    case ADD_FILES: {
      return [...state, ...action.payload];
    }
    case DELETE_FILE: {
      return state.filter((name) => name !== action.payload);
    }
    default: {
      return state;
    }
  }
};
