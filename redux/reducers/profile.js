import { SET_PROFILE } from "../constants";

const initialPeopleState = {};
export const profileReducer = (state = initialPeopleState, action) => {
  switch (action.type) {
    case SET_PROFILE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
