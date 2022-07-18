import axios from "axios";
import {
  AUTH_ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  ALL_COUNTRIES,
  ALL_STATES,
  ALL_DISTRICTS,
} from "./types";

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
    dispatch(getAllCountries());
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
    dispatch(getAllState());
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
    dispatch(getAllDistricts());
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

export const getAllCountries = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/regions/get-all-countries");
    dispatch({
      type: ALL_COUNTRIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAllState = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/regions/get-all-states");
    dispatch({
      type: ALL_STATES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAllDistricts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/regions/get-all-districts");
    dispatch({
      type: ALL_DISTRICTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//EDIT
