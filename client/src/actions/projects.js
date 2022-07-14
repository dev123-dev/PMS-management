import axios from "axios";
import {
  AUTH_ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  ALL_PROJECT_STATUS,
  ALL_FOLDER_NAMES,
  ACTIVE_PROJECT_STATUS,
  JOB_QUEUE_PROJECTS,
  DAILY_JOBSHEET_PROJECTS,
  GET_ALL_CHANGES,
  GET_LATEST_CHANGES,
  UNVERIFIED_PROJECTS,
  ALL_STATUS_VERIFICATION,
  AMENDMENT_PROJECTS,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//ADD

export const addProject = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/projects/add-project", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Deactive

export const deactiveProjectData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/projects/deactive-project-data", finalData, config);

    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const addProjectStatus = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/projects/add-project-status", finalData, config);
    dispatch(getAllProjectStatus());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddProjectTrack = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/projects/add-project-track", finalData, config);
    dispatch(getJobQueueProjectDeatils());
    dispatch(getDailyJobsheetProjectDeatils());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddAmendmentHistory = (amendmentData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post(
      "/api/projects/add-amendment-history",
      amendmentData,
      config
    );
    // dispatch(getJobQueueProjectDeatils());
    // dispatch(getDailyJobsheetProjectDeatils());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//EDIT

export const EditProjectData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_FALSE,
    });
    await axios.post("/api/projects/edit-project", finalData);
    dispatch(getJobQueueProjectDeatils());
    dispatch(getDailyJobsheetProjectDeatils());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const editProjectStatus = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/projects/edit-project-status", finalData);
    dispatch(getAllProjectStatus());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const VerifyProject = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/projects/verify-project", finalData, config);
    dispatch(getverificationProjectDeatils());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//DEACTIVE

export const deactiveProject = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/projects/deactive-project", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const deactiveProjectStatus = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post(
      "/api/projects/deactive-project-status",
      finalData,
      config
    );
    dispatch(getAllProjectStatus());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//SELECT

export const getUpdatedProjectStaus = () => async (dispatch) => {
  try {
    dispatch(getJobQueueProjectDeatils());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getUpdatedProjectStausForDailyJobSheet =
  () => async (dispatch) => {
    try {
      dispatch(getDailyJobsheetProjectDeatils());
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

export const getAllProjectStatus = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/projects/get-all-project-status");
    dispatch({
      type: ALL_PROJECT_STATUS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAllProjectStatusVerification = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "/api/projects/get-project-status-verification"
    );
    dispatch({
      type: ALL_STATUS_VERIFICATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAllFolder = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/projects/get-all-folder-name");
    dispatch({
      type: ALL_FOLDER_NAMES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getActiveProjectStatus = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/projects/get-active-project-status");
    dispatch({
      type: ACTIVE_PROJECT_STATUS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getJobQueueProjectDeatils = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/projects/get-job-queue-project-details",
      finalData
    );
    dispatch({
      type: JOB_QUEUE_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    // dispatch({
    //   type: AUTH_ERROR,
    // });
    console.log(err);
    // dispatch(getJobQueueProjectDeatils(finalData));
  }
};

export const getDailyJobsheetProjectDeatils =
  (selDateData) => async (dispatch) => {
    try {
      const res = await axios.post(
        "/api/projects/get-daily-jobsheet-project-details",
        selDateData
      );
      dispatch({
        type: DAILY_JOBSHEET_PROJECTS,
        payload: res.data,
      });
    } catch (err) {
      // dispatch({
      //   type: AUTH_ERROR,
      // });
      console.log(err);
      // dispatch(getDailyJobsheetProjectDeatils(selDateData));
    }
  };

//verifivation
export const getverificationProjectDeatils =
  (finalData) => async (dispatch) => {
    try {
      const res = await axios.post(
        "/api/projects/get-verification-project-details",
        finalData
      );
      dispatch({
        type: UNVERIFIED_PROJECTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const getAllchanges = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/projects/get-all-changes", finalData);
    localStorage.setItem("getAllChangesDetails", JSON.stringify(res.data));
    dispatch({
      type: GET_ALL_CHANGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getLatestChanges = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/projects/get-latest-change", finalData);
    localStorage.setItem("getLatestChangesDetails", JSON.stringify(res.data));
    dispatch({
      type: GET_LATEST_CHANGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAmendmentProjectDeatils = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/projects/get-amendment-project-details");
    dispatch({
      type: AMENDMENT_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    // dispatch({
    //   type: AUTH_ERROR,
    // });
    console.log(err);
    // dispatch(getJobQueueProjectDeatils(finalData));
  }
};
