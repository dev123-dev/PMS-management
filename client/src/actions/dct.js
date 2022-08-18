import axios from "axios";
import {
  // AUTH_ERROR,
  ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  ALL_LEADS,
  ALL_LEADS_DD,
  LAST_MSG,
  CALLHISTORY,
  GET_ALL_LEADS,
  GET_ALL_LEADS_DD,
  DCT_CLIENTS,
  DCT_CLIENTS_DD,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//ADD

export const addDctLeadDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/add-dct-Leads", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addDctClientDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/add-dct-client", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addDctCalls = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    const res = await axios.post("/api/dct/add-dct-calls", finalData, config);
    const res2 = await axios.post(
      "/api/dct/update-dct-leads-status",
      finalData,
      config
    );
    if (finalData.filterData) {
      dispatch(getDctLeadDetails(finalData.filterData));
      dispatch(getDctLeadDetailsDD(finalData.filterData));
    }
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
export const editDctLeadDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/edit-dct-Leads", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addNewDctStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/add-new-dct-staff", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const editDctStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/edit-dct-staff", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const deactivateDctStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/deactivate-dct-staff", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const deactivateDctLeadDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/deactivate-dct-Leads", finalData, config);
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
export const getDctLeadDetails = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/get-dct-Leads", finalData, config);
    dispatch({
      type: ALL_LEADS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getDctLeadDetailsDD = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/get-dct-Leads", finalData, config);
    dispatch({
      type: ALL_LEADS_DD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllDctLead = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/dct/get-all-dct-Leads",
      finalData,
      config
    );
    dispatch({
      type: GET_ALL_LEADS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllDctLeadDD = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/dct/get-all-dct-Leads",
      finalData,
      config
    );
    dispatch({
      type: GET_ALL_LEADS_DD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getDctClient = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/get-dct-clients", finalData, config);
    dispatch({
      type: DCT_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getDctClientDD = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/get-dct-clients", finalData, config);
    dispatch({
      type: DCT_CLIENTS_DD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getLastmessage = (searchData) => async (dispatch) => {
  try {
    dispatch({
      type: LAST_MSG,
      payload: "",
    });
    const res = await axios.post("/api/dct/get-last-message", searchData);
    dispatch({
      type: LAST_MSG,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCallHistory = (searchData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/get-call-history", searchData);
    dispatch({
      type: CALLHISTORY,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
