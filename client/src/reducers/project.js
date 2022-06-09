import {
  ALL_PROJECT_STATUS,
  JOB_QUEUE_PROJECTS,
  DAILY_JOBSHEET_PROJECTS,
} from "../actions/types";

const initialState = {
  allProjectStatus: [],
  jobQueueProjects: [],
  dailyJobsheetProjects: [],
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
    default:
      return state;
  }
};

export default settings;
