import {
  ALL_PROJECT_STATUS,
  JOB_QUEUE_PROJECTS,
  DAILY_JOBSHEET_PROJECTS,
  GET_ALL_CHANGES,
} from "../actions/types";

const initialState = {
  allProjectStatus: [],
  jobQueueProjects: [],
  dailyJobsheetProjects: [],
  getAllChanges: [],
};

const settings = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_PROJECT_STATUS:
      return {
        ...state,
        allProjectStatus: payload,
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

    default:
      return state;
  }
};

export default settings;
