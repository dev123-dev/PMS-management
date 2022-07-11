import axios from "axios";
import {
  AUTH_ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  PAYMENT_MODE,
  ALL_DEPARTMENT,
  ALL_DESIGNATION,
  ACTIVE_DESIGNATION,
  ALL_MENUS,
  ACTIVE_MENUS,
  ALL_RIGHTS,
  ALL_FEEDBACK,
  ALL_DELETED_PROJECTS,
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

export const EditFeedbackData = (finalData) => async (dispatch) => {
  // console.log("action", finalData);
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
