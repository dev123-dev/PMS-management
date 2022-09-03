import {
  GET_ALL_SCT_LEADS,
  GET_ALL_SCT_LEADS_DD,
  GET_ALL_SCT_LEADS_EMP,
  ALL_SCT_PROJECT,
  SCT_LAST_MSG,
  SCTCALLHISTORY,
} from "../actions/types";

const initialState = {
  getAllSctLeads: [],
  getAllSctLeadsDD: [],
  getAllSctLeadsEmp: [],
  sctLastMsg: [],
  allSctProject: [],
  sctcallHistory: [],
};

const sct = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_SCT_LEADS:
      return {
        ...state,
        getAllSctLeads: payload,
      };
    case GET_ALL_SCT_LEADS_DD:
      return {
        ...state,
        getAllSctLeadsDD: payload,
      };
    case GET_ALL_SCT_LEADS_EMP:
      return {
        ...state,
        getAllSctLeadsEmp: payload,
      };
    case SCT_LAST_MSG:
      return {
        ...state,
        sctLastMsg: payload,
      };
    case SCTCALLHISTORY:
      return {
        ...state,
        sctcallHistory: payload,
      };
    case ALL_SCT_PROJECT:
      return {
        ...state,
        allSctProject: payload,
      };
    default:
      return state;
  }
};

export default sct;
