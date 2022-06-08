import { ALL_PROJECT_STATUS, JOB_QUEUE_PROJECTS } from "../actions/types";

const initialState = {
  allProjectStatus: [],
  jobQueueProjects: [],
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
    default:
      return state;
  }
};

export default settings;
