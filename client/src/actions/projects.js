import axios from "axios";
import {
  AUTH_ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  ALL_PROJECT_STATUS,
  ACTIVE_PROJECT_STATUS,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//ADD

export const AddProject = (finalData) => async (dispatch) => {
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

export const EditProject = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_FALSE,
    });
    await axios.post("/api/projects/edit-project", finalData);
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

//SELECT
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
