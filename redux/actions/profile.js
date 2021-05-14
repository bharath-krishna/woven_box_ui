import { SET_PROFILE } from "../constants";

export const setFeeds = (profile) => {
  return {
    type: SET_PROFILE,
    payload: profile,
  };
};
