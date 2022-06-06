import { ALL_CLIENTS } from "../actions/types";

const initialState = {
  allClient: [],
};

const client = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_CLIENTS:
      return {
        ...state,
        allClient: payload,
      };

    default:
      return state;
  }
};

export default client;
