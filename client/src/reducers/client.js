import {
  ALL_CLIENTS,
  ACTIVE_CLIENTS,
  ACTIVE_CLIENT_FILTER,
  ACTIVE_STAFF_FILTER,
  // ALL_DJS_CLIENTS,
  ALL_DJS_FOLDER,
  // ALL_VERF_CLIENTS,
  ALL_VERF_FOLDER,
} from "../actions/types";

const initialState = {
  allClient: [],
  activeClient: [],
  activeClientFilter: [],
  activeStaffFilter: [],
  // activeDailyJobSheetClients: [],
  activeDailyJobSheetFolder: [],
  // activeVerfificationClients: [],
  activeVerfificationFolders: [],
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
    case ACTIVE_STAFF_FILTER:
      return {
        ...state,
        activeStaffFilter: payload,
      };
    // case ALL_DJS_CLIENTS:
    //   return {
    //     ...state,
    //     activeDailyJobSheetClients: payload,
    //   };
    case ALL_DJS_FOLDER:
      return {
        ...state,
        activeDailyJobSheetFolder: payload,
      };

    // case ALL_VERF_CLIENTS:
    //   return {
    //     ...state,
    //     activeVerfificationClients: payload,
    //   };
    case ALL_VERF_FOLDER:
      return {
        ...state,
        activeVerfificationFolders: payload,
      };
    default:
      return state;
  }
};

export default client;
