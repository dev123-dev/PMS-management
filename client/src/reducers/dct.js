import {
  ALL_LEADS,
  ALL_LEADS_DD,
  GET_ALL_LEADS,
  GET_ALL_LEADS_DD,
  LAST_MSG,
  CALLHISTORY,
} from "../actions/types";

const initialState = {
  allLeads: [],
  allLeadsDD: [],
  getAllLeads: [],
  getAllLeadsDD: [],
  lastMsg: [],
  callHistory: [],
};

const dct = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_LEADS:
      return {
        ...state,
        allLeads: payload,
      };
    case ALL_LEADS_DD:
      return {
        ...state,
        allLeadsDD: payload,
      };
    case GET_ALL_LEADS:
      return {
        ...state,
        getAllLeads: payload,
      };
    case GET_ALL_LEADS_DD:
      return {
        ...state,
        getAllLeadsDD: payload,
      };
    case LAST_MSG:
      return {
        ...state,
        lastMsg: payload,
      };
    case CALLHISTORY:
      return {
        ...state,
        callHistory: payload,
      };
    default:
      return state;
  }
};

export default dct;
