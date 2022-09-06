import {
  ALL_SCT_LEADS,
  ALL_SCT_LEADS_DD,
  ALL_SCT_LEADS_EMP,
  GET_ALL_SCT_LEADS,
  GET_ALL_SCT_LEADS_DD,
  GET_ALL_SCT_LEADS_EMP,
  ALL_SCT_PROJECT,
  SCT_PROJECT,
  SCT_LAST_MSG,
  ALL_DEMOS,
  SCTCALLHISTORY,
  SCHEDULED_DEMOS,
  ALL_SCT_CALLS,
  ALL_SCT_CALLS_EMP,
} from "../actions/types";

const initialState = {
  allSctLeads: [],
  allSctLeadsDD: [],
  allSctLeadsEmp: [],

  getAllSctLeads: [],
  getAllSctLeadsDD: [],
  getAllSctLeadsEmp: [],

  sctLastMsg: [],
  allSctProject: [],
  projectList: [],
  sctcallHistory: [],
  allDemos: [],
  scheduledDemos: [],
  allSctCalls: null,
  allSctCallsEmp: null,
};

const sct = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_SCT_LEADS:
      return {
        ...state,
        allSctLeads: payload,
      };
    case ALL_SCT_LEADS_DD:
      return {
        ...state,
        allSctLeadsDD: payload,
      };
    case ALL_SCT_LEADS_EMP:
      return {
        ...state,
        allSctLeadsEmp: payload,
      };
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
    case SCT_PROJECT:
      return {
        ...state,
        projectList: payload,
      };
    case ALL_DEMOS:
      return {
        ...state,
        allDemos: payload,
      };
    case SCHEDULED_DEMOS:
      return {
        ...state,
        scheduledDemos: payload,
      };
    case ALL_SCT_CALLS:
      return {
        ...state,
        allSctCalls: payload,
      };
    case ALL_SCT_CALLS_EMP:
      return {
        ...state,
        allSctCallsEmp: payload,
      };
    default:
      return state;
  }
};

export default sct;