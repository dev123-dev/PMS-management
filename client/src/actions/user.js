import axios from "axios";

import {
  AUTH_ERROR,
  ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  ALL_EMPLOYEE,
  ALL_STAFF_NAMES,
  ACTIVE_EMPLOYEE,
  USER_GROUPS,
  LAST_ENTERED_EMP_CODE,
  LEAVES,
  GET_LEAVES_STAFF,
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

export const getAllStaff = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/get-all-staff-name");
    dispatch({
      type: ALL_STAFF_NAMES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getFilterEmpDetails = (finalData) => async (dispatch) => {
  // console.log("action", finalData);
  try {
    const res = await axios.post(
      "/api/users/get-filter-emp-details",
      finalData
    );
    dispatch({
      type: ALL_EMPLOYEE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
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
    localStorage.setItem("allUserGroupData", JSON.stringify(res.data));
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

export const getLastEnteredEmpCode = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/get-last-entered-emp-code");
    localStorage.setItem("lastEnteredCode", JSON.stringify(res.data));
    dispatch({
      type: LAST_ENTERED_EMP_CODE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//For Leaves

//ADD Leave

export const addLeaves = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/users/add-leaves", finalData, config);
    dispatch(getALLLeaves());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

//All Leaves

export const getALLLeaves = (selDateData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/get-all-Leaves", selDateData);
    // localStorage.setItem("allUserGroupData", JSON.stringify(res.data));
    dispatch({
      type: LEAVES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getLeavesStaff = (selDateData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/get-leaves-staff", selDateData);
    dispatch({
      type: GET_LEAVES_STAFF,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
