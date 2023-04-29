import {
  ALL_PROJECT_STATUS,
  ALL_FOLDER_NAMES,
  JOB_QUEUE_PROJECTS,
  DAILY_JOBSHEET_PROJECTS,
  DAILY_JOBSHEET_EXCEL_EXPORT,
  GET_ALL_CHANGES,
  GET_LATEST_CHANGES,
  UNVERIFIED_PROJECTS,
  VERIFIED_PROJECTS,
  ALL_STATUS_VERIFICATION,
  AMENDMENT_PROJECTS,
  AMENDMENT_HISTORY_PROJECTS,
  AMENDMENT_LAST_HISTORY_PROJECTS,
  AMENDMENT_LAST_COUNTER,
  SELECTED_CLIENT_DATA,
  SELECTED_PROJECT_DATA,
  CLIENTS_REPORT_DATA,
  CLIENT_JOB_SUMMARY,
} from "../actions/types";

const initialState = {
  allProjectStatus: [],
  jobQueueProjects: [],
  dailyJobsheetProjects: [],
  getAllChanges: [],
  getLatestChangesValue: [],
  unVerifiedProjects: [],
  allStatusVerification: [],
  amendmentProjects: [],
  amendentHistory: [],
  amendentLastHistory: [],
  amendentLastCounter: [],
  selectedClientData: [],
  selectedProjectData: [],
  clientsReportData: [],
  clientJobSummary: [],
};

const projects = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_PROJECT_STATUS:
      return {
        ...state,
        allProjectStatus: payload,
      };
    case ALL_FOLDER_NAMES:
      localStorage.setItem("AllFolderNme", JSON.stringify(payload));
      return {
        ...state,
        allFolderName: payload,
      };

    case JOB_QUEUE_PROJECTS:
      return {
        ...state,
        jobQueueProjects: payload,
      };
    case DAILY_JOBSHEET_PROJECTS:
      return {
        ...state,
        dailyJobsheetProjects: payload,
      };
    case DAILY_JOBSHEET_EXCEL_EXPORT:
      return {
        ...state,
        dailyJobsheetexcelExport: payload,
      };
    case GET_ALL_CHANGES:
      return {
        ...state,
        getAllChangesData: payload,
      };
    case GET_LATEST_CHANGES:
      return {
        ...state,
        getLatestChangesValue: payload,
      };
    case UNVERIFIED_PROJECTS:
      return {
        ...state,
        unVerifiedProjects: payload,
      };

    case VERIFIED_PROJECTS:
      return {
        ...state,
        VerifiedProjects: payload,
      };

    case ALL_STATUS_VERIFICATION:
      return {
        ...state,
        allStatusVerification: payload,
      };
    case AMENDMENT_PROJECTS:
      return {
        ...state,
        amendmentProjects: payload,
      };
    case AMENDMENT_HISTORY_PROJECTS:
      return {
        ...state,
        amendentHistory: payload,
      };
    case AMENDMENT_LAST_HISTORY_PROJECTS:
      return {
        ...state,
        amendentLastHistory: payload,
      };
    case AMENDMENT_LAST_COUNTER:
      return {
        ...state,
        amendentLastCounter: payload,
      };
    case SELECTED_CLIENT_DATA:
      return {
        ...state,
        selectedClientData: payload,
      };
    case SELECTED_PROJECT_DATA:
      return {
        ...state,
        selectedProjectData: payload,
      };
    case CLIENTS_REPORT_DATA:
      return {
        ...state,
        clientsReportData: payload,
      };
    case CLIENT_JOB_SUMMARY:
      return {
        ...state,
        clientJobSummary: payload,
      };
    default:
      return state;
  }
};

export default projects;
