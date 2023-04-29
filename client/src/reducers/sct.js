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
  ALL_DEMOS_TAKEN,
  ALL_DEMOS_TODAY_ADDED,
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
  GET_SELECTED_CLIENT,
  SELECTED_PROJECT,
  ALL_SCT_ASSIGNED_LEAD_DETAILS,
  SCT_CALLS_COUNT,
  ALL_LEAD_ENTRY_TODAY,
  ALL_SCT_SALES_VALUES,
  SCT_CALLS_CLIENT_COUNT,
  SCT_CALLS_FOLLOWUP,
  ALL_SUMMARY,
} from "../actions/types";

const initialState = {
  allSctLeads: [],
  allSctLeadsDD: [],
  allSctLeadsEmp: [],
  allSummary: [],
  getAllSctLeads: [],
  getAllSctLeadsDD: [],
  getAllSctLeadsEmp: [],

  sctLastMsg: [],
  allFollowUp: [],
  allSctProject: [],
  projectList: [],
  sctcallHistory: [],
  allDemos: [],
  allDemosTaken: [],
  allDemosAddedToday: [],
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
  selectedSctClient: null,
  selectedProject: [],
  allSctEmpAssignedLeadData: [],
  sctCallsCount: [],
  allLeadEnteredToday: [],
  sctCallsClientCount: [],
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
    case SCT_CALLS_FOLLOWUP:
      return {
        ...state,
        allFollowUp: payload,
      };
    case ALL_SCT_LEADS_EMP:
      return {
        ...state,
        allSctLeadsEmp: payload,
      };
    case ALL_SUMMARY:
      return {
        ...state,
        allSummary: payload,
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

    case SCT_CALLS_COUNT:
      return {
        ...state,
        sctCallsCount: payload,
      };
    case "SCT_CALLS_COUNT1":
      return {
        ...state,
        sctCallsCount1: payload,
      };
    case ALL_LEAD_ENTRY_TODAY:
      return {
        ...state,
        allLeadEnteredToday: payload,
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
    case ALL_DEMOS_TAKEN:
      return {
        ...state,
        allDemosTaken: payload,
      };
    case ALL_DEMOS_TODAY_ADDED:
      return {
        ...state,
        allDemosAddedToday: payload,
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
    case SCT_CALLS_CLIENT_COUNT:
      return {
        ...state,
        sctCallsClientCount: payload,
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
    case GET_SELECTED_CLIENT:
      return {
        ...state,
        selectedSctClient: payload,
      };
    case SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: payload,
      };

    case ALL_SCT_ASSIGNED_LEAD_DETAILS:
      return {
        ...state,
        allSctEmpAssignedLeadData: payload,
      };
    case ALL_SCT_SALES_VALUES:
      return {
        ...state,
        allsctsalesvalues: payload,
      };

    default:
      return state;
  }
};

export default sct;
