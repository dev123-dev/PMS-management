import axios from "axios";
import {
  AUTH_ERROR,
  ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  PAYMENT_MODE,
  TEAM_NAME,
  ALL_DEPARTMENT,
  ALL_DESIGNATION,
  ACTIVE_DESIGNATION,
  ALL_MENUS,
  ACTIVE_MENUS,
  ALL_RIGHTS,
  ALL_FEEDBACK,
  ALL_DELETED_PROJECTS,
  ALL_COMPANY_DETAILS,
  ALL_TEAMS_DETAILS,
  EXST_SCREENSHOT,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//ADD

export const AddNewDepartment = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/add-department", finalData, config);
    dispatch(getALLDepartment());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddMenu = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/add-menu", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddNewDesignation = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/add-designation", finalData, config);
    dispatch(getALLDesignation());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddPaymentMode = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/add-payment-mode", finalData, config);
    dispatch(getALLPaymentMode());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddRight = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/add-rights", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddFeedbackData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/add-feedback", finalData, config);
    dispatch(getAllFeedback());
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

export const editDepartment = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/edit-department", finalData);
    dispatch(getALLDepartment());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const EditMenu = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/edit-menu", finalData);

    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const editDesignation = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/edit-designation", finalData);
    dispatch(getALLDesignation());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const EditPaymentMode = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/edit-payment-mode", finalData);
    dispatch(getALLPaymentMode());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

///////////////////////////////////////////////////////////////////123
// export const editScreenshotDetails = (finalData) => async (dispatch) => {
//   console.log("action feedbcak", finalData);
//   try {
//     dispatch({
//       type: SET_LOADING_TRUE,
//     });
//     await axios.post("/api/settings/edit-screenshot", finalData);
//     dispatch(getAllFeedback());
//     dispatch({
//       type: SET_LOADING_FALSE,
//     });
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR,
//     });
//   }
// };




export const deleteScreenshot = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post(
      "/api/settings/delete-screenshot",
      finalData,
  
    );
    dispatch(getExistingscreenshot({imageId:finalData.feedbackId}));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
/////////////////////////////////////////////////
export const EditFeedbackData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/edit-feedback", finalData);
    dispatch(getAllFeedback());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const EditFeedbackStatusData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/edit-feedback-status", finalData);
    dispatch(getAllFeedback());
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

export const deactiveDesignationData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post(
      "/api/settings/deactive-designation-data",
      finalData,
      config
    );
    dispatch(getALLDesignation());
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
export const getALLPaymentMode = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/settings/get-all-payment-mode");
    localStorage.setItem("allPaymentModeData", JSON.stringify(res.data));
    dispatch({
      type: PAYMENT_MODE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getALLDepartment = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/settings/get-all-department");
    localStorage.setItem("allDepartmentData", JSON.stringify(res.data));
    dispatch({
      type: ALL_DEPARTMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getALLDesignation = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/settings/get-all-designation");
    // localStorage.setItem("allDesignationData", JSON.stringify(res.data));
    dispatch({
      type: ALL_DESIGNATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getActiveDesignation = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/settings/get-active-designation");
    localStorage.setItem("allDesignationData", JSON.stringify(res.data));
    dispatch({
      type: ACTIVE_DESIGNATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getALLMenus = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/settings/get-all-menus");
    dispatch({
      type: ALL_MENUS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getActiveMenus = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/settings/get-active-menus");
    dispatch({
      type: ACTIVE_MENUS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAllRights = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/settings/get-all-rights");
    dispatch({
      type: ALL_RIGHTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};


////////////////////////////////
export const getExistingscreenshot = (finalData) => async (dispatch) => {

 
  try {
    const res = await axios.post("/api/settings/get-existing-screenshot",finalData);
     dispatch({
     type: EXST_SCREENSHOT,
     payload: res.data,
   });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
/////////////////////////////////

export const getAllFeedback = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/settings/get-all-feedback", finalData);
    dispatch({
      type: ALL_FEEDBACK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getTrash = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/settings/get-deleted-projects");
    dispatch({
      type: ALL_DELETED_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const deleteProjectData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/delete-project-data", finalData, config);
    dispatch(getTrash());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const restoreProjectData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/restore-project-data", finalData, config);
    dispatch(getTrash());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Company Start
//ALL COMPANY DETAILS

export const getALLCompanyDetails = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/settings/get-all-company-details");
    localStorage.setItem("allCompanyData", JSON.stringify(res.data));
    dispatch({
      type: ALL_COMPANY_DETAILS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddCompanyDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/add-company", finalData, config);
    dispatch(getALLCompanyDetails());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const EditCompanyData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/edit-company-details", finalData);
    dispatch(getALLCompanyDetails());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const deactivateCompanyData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/deactive-company-data", finalData, config);
    dispatch(getALLCompanyDetails());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addNewBank = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/add-new-bank", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const editCompanyBank = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/edit-bank", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getALLTeamDetails = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/settings/get-all-teams-details");
    // localStorage.setItem("allDesignationData", JSON.stringify(res.data));
    dispatch({
      type: ALL_TEAMS_DETAILS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddNewTeam = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/add-team", finalData, config);
    dispatch(getALLTeamDetails());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const editTeam = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/edit-team", finalData);
    dispatch(getALLTeamDetails());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const deactiveTeamData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/settings/deactive-team-data", finalData, config);
    dispatch(getALLTeamDetails());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getALLTeams = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/settings/get-all-teams");
    localStorage.setItem("allTeamNameData", JSON.stringify(res.data));
    dispatch({
      type: TEAM_NAME,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Company code last
