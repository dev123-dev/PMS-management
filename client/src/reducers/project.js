import { ALL_PROJECT_STATUS } from "../actions/types";

const initialState = {
  allProjectStatus: [],
};

const settings = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_PROJECT_STATUS:
      return {
        ...state,
        allProjectStatus: payload,
      };
    default:
      return state;
  }
};

export default settings;
