import axios from "axios";

import { AUTH_ERROR, SET_LOADING_TRUE, SET_LOADING_FALSE } from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const AddUserGroup = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/users/add-user-group", finalData, config);

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
