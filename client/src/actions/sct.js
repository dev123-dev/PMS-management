import axios from "axios";
import {
  // AUTH_ERROR,
  ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  ALL_SCT_LEADS,
  ALL_SCT_LEADS_DD,
  ALL_SCT_LEADS_EMP,
  GET_ALL_SCT_LEADS,
  GET_ALL_SCT_LEADS_DD,
  GET_ALL_SCT_LEADS_EMP,
  SCT_LAST_MSG,
  SCTCALLHISTORY,
  ALL_SCT_PROJECT,
  ALL_DEMOS,
  SCT_PROJECT,
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
    await axios.post("/api/sct/deactivate-sct-Leads", finalData, config);
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
    await axios.post("/api/sct/deactivate-sct-staff", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

//**********************************SELECT**********************************
export const getSctLeadDetails = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/get-dct-Leads", finalData, config);
    dispatch({
      type: ALL_SCT_LEADS,
      payload: res.data.result1,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getSctLeadDetailsDD = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/get-sct-Leads", finalData, config);
    dispatch({
      type: ALL_SCT_LEADS_DD,
      payload: res.data.result1,
    });
    if (finalData === undefined || (finalData && finalData.emp !== true)) {
      dispatch({
        type: ALL_SCT_LEADS_EMP,
        payload: res.data.result2,
      });
    }
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

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
    const res = await axios.post("/api/sct/get-sct-last-message", searchData);
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

export const addSctCalls = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    const res = await axios.post("/api/sct/add-sct-calls", finalData, config);
    const res2 = await axios.post(
      "/api/sct/update-sct-leads-status",
      finalData,
      config
    );
    // dispatch(refreshLead(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getCallHistory = (searchData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/get-call-history", searchData);
    dispatch({
      type: SCTCALLHISTORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getALLSctProjects = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/sct/get-all-sct-projects");
    localStorage.setItem("allSctProjectData", JSON.stringify(res.data));
    dispatch({
      type: ALL_SCT_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const AddSctNewProject = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-sct-project", finalData, config);
    dispatch(getALLSctProjects());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addDemo = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-demo", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const editSctProject = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/edit-sct-project", finalData);
    dispatch(getALLSctProjects());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getProjectList = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/get-sct-project");
    dispatch({
      type: SCT_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getALLDemos = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/sct/get-all-demos");
    localStorage.setItem("allDemoData", JSON.stringify(res.data));
    dispatch({
      type: ALL_DEMOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const demoTaken = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_FALSE,
    });
    await axios.post("/api/sct/demo-taken-verify", finalData);
    dispatch(getALLDemos(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};
