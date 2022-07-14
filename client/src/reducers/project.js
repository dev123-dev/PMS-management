import {
  ALL_PROJECT_STATUS,
  ALL_FOLDER_NAMES,
  JOB_QUEUE_PROJECTS,
  DAILY_JOBSHEET_PROJECTS,
  GET_ALL_CHANGES,
  GET_LATEST_CHANGES,
  UNVERIFIED_PROJECTS,
  ALL_STATUS_VERIFICATION,
  AMENDMENT_PROJECTS,
  AMENDMENT_HISTORY_PROJECTS,
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
};

const settings = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_PROJECT_STATUS:
      return {
        ...state,
        allProjectStatus: payload,
      };
    case ALL_FOLDER_NAMES:
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
    default:
      return state;
  }
};

export default settings;
