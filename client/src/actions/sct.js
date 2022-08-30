import axios from "axios";
import {
  // AUTH_ERROR,
  ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  GET_ALL_SCT_LEADS,
  GET_ALL_SCT_LEADS_DD,
  GET_ALL_SCT_LEADS_EMP,
  SCT_LAST_MSG,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//ADD

export const addSctLeadDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-sct-Leads", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addSctClientDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-sct-client", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addNewSctStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-new-sct-staff", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

//EDIT
export const editSctLeadDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/edit-sct-Leads", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const editSctStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/edit-sct-staff", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

//DEACTIVE

export const deactivateSctLeadDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/deactivate-sct-Leads", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const deactivateSctStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/deactivate-sct-staff", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

//SELECT

//ALL LEADS
export const getAllSctLead = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/sct/get-all-sct-Leads",
      finalData,
      config
    );
    dispatch({
      type: GET_ALL_SCT_LEADS,
      payload: res.data.result1,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllSctLeadDD = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/sct/get-all-sct-Leads",
      finalData,
      config
    );
    dispatch({
      type: GET_ALL_SCT_LEADS_DD,
      payload: res.data.result1,
    });
    if (finalData === undefined || (finalData && finalData.emp !== true)) {
      dispatch({
        type: GET_ALL_SCT_LEADS_EMP,
        payload: res.data.result2,
      });
    }
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getSctLastmessage = (searchData) => async (dispatch) => {
  try {
    dispatch({
      type: SCT_LAST_MSG,
      payload: "",
    });
    const res = await axios.post("/api/dct/get-sct-last-message", searchData);
    dispatch({
      type: SCT_LAST_MSG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};
