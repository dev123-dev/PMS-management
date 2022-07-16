import axios from "axios";
import { AUTH_ERROR, SET_LOADING_TRUE, SET_LOADING_FALSE } from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//ADD

export const addCountryDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/regions/add-country-details", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const addStateDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/regions/add-state-details", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const addDistrictDetails = (finalData) => async (dispatch) => {
  // console.log(finalData );
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/regions/add-districts-details", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
