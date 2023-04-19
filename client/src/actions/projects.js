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
  CLIENTS_REPORT_DATA,
  CLIENT_JOB_SUMMARY,
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
    dispatch(getSummary({ projectId: finalData.mainProjectId }));
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
    const res = await axios.post(
      "/api/projects/verify-project",
      finalData,
      config
    );
    dispatch(getverificationProjectDeatils(finalData.searchData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const updateMsgSent = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/projects/update-msg-sent", finalData);
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
    localStorage.setItem("activeProjectStatus", JSON.stringify(res.data));
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
    localStorage.setItem("AllFolderNme", JSON.stringify(res.data));
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

export const getDailyJobSheetExcelExport =
  (selDateData) => async (dispatch) => {
    try {
      const res = await axios.post(
        "/api/projects/get-daily-jobsheet-excel-details",
        selDateData
      );
      dispatch({
        type: DAILY_JOBSHEET_EXCEL_EXPORT,
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

export const getverifiedProjectDeatils = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/projects/get-verified-project-details",
      finalData
    );
    dispatch({
      type: VERIFIED_PROJECTS,
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

export const getAmendmentProjectDeatils = (setTypeData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/projects/get-amendment-project-details",
      setTypeData
    );
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

export const getAmendmentHistoryDeatils = (amenddata) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/projects/get-all-amendment-histories",
      amenddata
    );
    dispatch({
      type: AMENDMENT_HISTORY_PROJECTS,
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

// export const getLastAmendmentHistoryDeatils =
//   (lastAmendment) => async (dispatch) => {

//     try {
//       const res = await axios.post(
//         "/api/projects/get-last-amendment-histories",
//         lastAmendment
//       );
//       localStorage.setItem("getLastAmendmentDetails", JSON.stringify(res.data));
//       dispatch({
//         type: AMENDMENT_LAST_HISTORY_PROJECTS,
//         payload: res.data,
//       });
//     } catch (err) {

//       console.log(err);

//     }
//   };
export const getLastAmendmentHistoryDeatils =
  (amenddata) => async (dispatch) => {
    try {
      const res = await axios.post(
        "/api/projects/get-last-amendment-histories",
        amenddata
      );
      localStorage.setItem("getLastAmendmentDetails", JSON.stringify(res.data));
      dispatch({
        type: AMENDMENT_LAST_HISTORY_PROJECTS,
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

export const getSelectedClientDeatils = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/projects/get-selected-client-details",
      finalData
    );
    dispatch({
      type: SELECTED_CLIENT_DATA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getLastAmendmentCounter =
  (amendmentProjectId) => async (dispatch) => {
    try {
      const res = await axios.post(
        "/api/projects/get-last-amendment-counter",
        amendmentProjectId
      );
      localStorage.setItem("getLastAmendmentCount", JSON.stringify(res.data));
      dispatch({
        type: AMENDMENT_LAST_COUNTER,
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

export const updateProjectTrack = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/projects/update-amendment-type-status", finalData);
    // dispatch(getAllProjectStatus());
    dispatch(getAmendmentProjectDeatils());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getClientsReport = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/projects/get-clients-report", finalData);
    dispatch({
      type: CLIENTS_REPORT_DATA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSummary = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/projects/get-summary", finalData);
    dispatch({
      type: CLIENT_JOB_SUMMARY,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
