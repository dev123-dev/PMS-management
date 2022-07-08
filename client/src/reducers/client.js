import {
  ALL_CLIENTS,
  ACTIVE_CLIENTS,
  ACTIVE_CLIENT_FILTER,
  ALL_DJS_CLIENTS,
  ALL_VERF_CLIENTS,
} from "../actions/types";

const initialState = {
  allClient: [],
  activeClient: [],
  activeClientFilter: [],
  activeDailyJobSheetClients: [],
  activeVerfificationClients: [],
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
    case ALL_DJS_CLIENTS:
      return {
        ...state,
        activeDailyJobSheetClients: payload,
      };
    case ALL_VERF_CLIENTS:
      return {
        ...state,
        activeVerfificationClients: payload,
      };

    default:
      return state;
  }
};

export default client;
