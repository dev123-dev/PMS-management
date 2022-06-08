import {
  ALL_CLIENTS,
  ACTIVE_CLIENTS,
  ACTIVE_CLIENT_FILTER,
} from "../actions/types";

const initialState = {
  allClient: [],
  activeClient: [],
  activeClientFilter: [],
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
    case ACTIVE_CLIENT_FILTER:
      return {
        ...state,
        activeClientFilter: payload,
      };
    default:
      return state;
  }
};

export default client;
