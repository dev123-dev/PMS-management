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
  ALL_DCT_CALLS,
  ALL_DCT_CALLS_EMP,
  ALL_LEADS_EMP,
  GET_ALL_LEADS_EMP,
  ALL_DCT_CLIENTS_EMP,
  DCT_CLIENTS_EMP,
  GET_LEADS_LIST,
  GET_SELECTED_LEADS,
  GET_STAFF_DATA,
  GET_INSTRUCTION_DATA,
  ALL_ASSIGNED_LEAD_DETAILS,
  DCT_CALLS_CLIENT_COUNT,
  DCT_CALLS_COUNT,
  ALL_DCT_LEAD_ENTRY_TODAY,
  GET_ALL_LEADS_ENTERED_BY,
  GET_LEADS_ENTERED_BY,
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
  allDctCalls: null,
  allDctCallsEmp: null,
  allLeadsEmp: [],
  getAllLeadsEmp: [],
  allDctClientsEmp: [],
  dctClientsEmp: [],
  leadsList: [],
  selectedLeads: [],
  staffData: [],
  instructionData: [],
  allEmpAssignedLeadData: [],
  dctCallsClientCount: [],
  dctCallsCount: [],
  allDctLeadEnteredToday: [],
  getAllLeadsEnterdBy: [],
  allLeadsEnterdBy: [],
  dctAllLeadsCount: 0,
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
    case ALL_ASSIGNED_LEAD_DETAILS:
      return {
        ...state,
        allEmpAssignedLeadData: payload,
      };
    case CALLHISTORY:
      return {
        ...state,
        callHistory: payload,
      };
    case ALL_DCT_CALLS:
      return {
        ...state,
        allDctCalls: payload,
      };
    case ALL_DCT_CALLS_EMP:
      return {
        ...state,
        allDctCallsEmp: payload,
      };
    case ALL_LEADS_EMP:
      return {
        ...state,
        allLeadsEmp: payload,
      };
    case GET_ALL_LEADS_EMP:
      return {
        ...state,
        getAllLeadsEmp: payload,
      };
    case GET_LEADS_ENTERED_BY:
      return {
        ...state,
        allLeadsEnterdBy: payload,
      };

    case GET_ALL_LEADS_ENTERED_BY:
      return {
        ...state,
        getAllLeadsEnterdBy: payload,
      };
    case ALL_DCT_CLIENTS_EMP:
      return {
        ...state,
        allDctClientsEmp: payload,
      };
    case DCT_CLIENTS_EMP:
      return {
        ...state,
        dctClientsEmp: payload,
      };
    case GET_LEADS_LIST:
      return {
        ...state,
        leadsList: payload,
      };
    case GET_SELECTED_LEADS:
      return {
        ...state,
        selectedLeads: payload,
      };
    case GET_STAFF_DATA:
      return {
        ...state,
        staffData: payload,
      };
    case GET_INSTRUCTION_DATA:
      return {
        ...state,
        instructionData: payload,
      };
    case DCT_CALLS_CLIENT_COUNT:
      return {
        ...state,
        dctCallsClientCount: payload,
      };

    case DCT_CALLS_COUNT:
      return {
        ...state,
        dctCallsCount: payload,
      };

    case ALL_DCT_LEAD_ENTRY_TODAY:
      return {
        ...state,
        allDctLeadEnteredToday: payload,
      };
    case "DCT_ALL_LEADS_COUNT":
      return {
        ...state,
        dctAllLeadsCount: payload,
      };

    default:
      return state;
  }
};

export default dct;
