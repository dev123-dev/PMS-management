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
  DEMO_STATES,
  DEMO_LEADS,
  DEMO_CHECK,
  SCT_CLIENTS,
  SCT_CLIENTS_DD,
  SCT_CLIENTS_EMP,
  PO_PRINT,
  GET_SCT_STAFF_DATA,
  GET_SCT_LEADS_LIST,
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
  demoStates: [],
  demoLeads: [],
  demoCheck: null,
  sctClients: [],
  sctClientsDD: [],
  sctClientsEmp: [],
  poPrint: [],
  sctStaffData: [],
  sctLeadsList: [],
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
    case DEMO_STATES:
      return {
        ...state,
        demoStates: payload,
      };
    case DEMO_LEADS:
      return {
        ...state,
        demoLeads: payload,
      };
    case DEMO_CHECK:
      return {
        ...state,
        demoCheck: payload,
      };
    case SCT_CLIENTS:
      return {
        ...state,
        sctClients: payload,
      };
    case SCT_CLIENTS_DD:
      return {
        ...state,
        sctClientsDD: payload,
      };
    case SCT_CLIENTS_EMP:
      return {
        ...state,
        sctClientsEmp: payload,
      };
    case PO_PRINT:
      return {
        ...state,
        poPrint: payload,
      };
    case GET_SCT_STAFF_DATA:
      return {
        ...state,
        sctStaffData: payload,
      };
    case GET_SCT_LEADS_LIST:
      return {
        ...state,
        sctLeadsList: payload,
      };

    default:
      return state;
  }
};

export default sct;
