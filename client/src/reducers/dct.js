import {
  ALL_LEADS,
  ALL_LEADS_DD,
  GET_ALL_LEADS,
  GET_ALL_LEADS_DD,
  DCT_CLIENTS,
  DCT_CLIENTS_DD,
  ALL_DCT_CLIENTS,
  ALL_DCT_CLIENTS_DD,
  LAST_MSG,
  CALLHISTORY,
} from "../actions/types";

const initialState = {
  allLeads: [],
  allLeadsDD: [],
  getAllLeads: [],
  getAllLeadsDD: [],
  allDctClients: [],
  allDctClientsDD: [],
  dctClients: [],
  dctClientsDD: [],
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
    case ALL_DCT_CLIENTS:
      return {
        ...state,
        allDctClients: payload,
      };
    case ALL_DCT_CLIENTS_DD:
      return {
        ...state,
        allDctClientsDD: payload,
      };
    case DCT_CLIENTS:
      return {
        ...state,
        dctClients: payload,
      };
    case DCT_CLIENTS_DD:
      return {
        ...state,
        dctClientsDD: payload,
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
