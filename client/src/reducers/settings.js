import {
  PAYMENT_MODE,
  TEAM_NAME,
  ALL_DEPARTMENT,
  ALL_DESIGNATION,
  ALL_STAFF_NAMES,
  ACTIVE_DESIGNATION,
  ALL_FEEDBACK,
  ALL_DELETED_PROJECTS,
  ALL_COMPANY_DETAILS,
  ALL_TEAMS_DETAILS,
  EXST_SCREENSHOT,
} from "../actions/types";

const initialState = {
  paymentMode: [],
  activeTeams: [],
  allDeptartment: [],
  allDesignation: [],
  activeDesignation: [],
  allFeedback: [],
  allDeletedProjects: [],
  allCompanyDetails: [],
  allTeamDetails: [],
  allScreenshot:[],
};

const settings = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_MODE:
      return {
        ...state,
        paymentMode: payload,
      };
    case TEAM_NAME:
      return {
        ...state,
        activeTeams: payload,
      };

    case ALL_STAFF_NAMES:
      return {
        ...state,
        allStaffName: payload,
      };

    case ALL_DEPARTMENT:
      return {
        ...state,
        allDepartment: payload,
      };
    case ALL_DESIGNATION:
      return {
        ...state,
        allDesignation: payload,
      };
    case ACTIVE_DESIGNATION:
      return {
        ...state,
        activeDesignation: payload,
      };
    case ALL_FEEDBACK:
      return {
        ...state,
        allFeedback: payload,
      };
    case ALL_DELETED_PROJECTS:
      return {
        ...state,
        allDeletedProjects: payload,
      };
    case ALL_COMPANY_DETAILS:
      return {
        ...state,
        allCompanyDetails: payload,
      };
    case ALL_TEAMS_DETAILS:
      return {
        ...state,
        allTeamDetails: payload,
      };
      case EXST_SCREENSHOT:
        return{
          ...state,
          allScreenshot:payload,
        };
    default:
      return state;
  }
};

export default settings;
