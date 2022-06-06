import { ALL_CLIENTS, ACTIVE_CLIENTS } from "../actions/types";

const initialState = {
  allClient: [],
  activeClient: [],
};

const client = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_CLIENTS:
      return {
        ...state,
        allClient: payload,
      };
    case ACTIVE_CLIENTS:
      return {
        ...state,
        activeClient: payload,
      };
    default:
      return state;
  }
};

export default client;
