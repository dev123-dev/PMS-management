import axios from "axios";

import {
  AUTH_ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  ALL_EMPLOYEE,
  ACTIVE_EMPLOYEE,
  USER_GROUPS,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const addUserGroup = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/users/add-user-group", finalData, config);
    dispatch(getALLUserGroups());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddEmployee = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/users/add-employee", finalData, config);

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

export const editUserGroup = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/users/edit-user-groups", finalData, config);
    dispatch(getALLUserGroups());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const editEmployeeDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/users/edit-employee", finalData, config);
    dispatch(getAllEmployee());
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

export const deactiveEmployeeDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/users/deactive-employee", finalData, config);
    // dispatch(getAllUser());
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

export const getAllEmployee = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/get-all-employee");
    dispatch({
      type: ALL_EMPLOYEE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getActiveEmployee = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/get-active-employee");
    dispatch({
      type: ACTIVE_EMPLOYEE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getALLUserGroups = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/get-all-user-groups");
    dispatch({
      type: USER_GROUPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
