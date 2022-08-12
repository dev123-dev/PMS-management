import axios from "axios";
import {
  // AUTH_ERROR,
  ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  ALL_COUNTRIES,
  ALL_STATES,
  ALL_DISTRICTS,
  ACTIVE_STATE,
  ACTIVE_DISTRICTS,
  ACTIVE_COUNTRY,
  STATES,
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
      type: ERROR,
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
      type: ERROR,
    });
  }
};

export const addDistrictDetails = (finalData) => async (dispatch) => {
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
      type: ERROR,
    });
  }
};

//EDIT

export const EditCountryData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_FALSE,
    });
    await axios.post("/api/regions/edit-country-details", finalData);
    dispatch(getAllCountries());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const EditStateData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_FALSE,
    });
    await axios.post("/api/regions/edit-state-details", finalData);
    dispatch(getAllState());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const EditDistrictData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_FALSE,
    });
    await axios.post("/api/regions/edit-districts-details", finalData);
    dispatch(getAllDistricts());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

//DEACTIVATE

export const deactiveCountryData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post(
      "/api/regions/deactive-country-details",
      finalData,
      config
    );
    dispatch(getAllCountries());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const deactiveStateData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/regions/deactive-state-details", finalData, config);
    dispatch(getAllState());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const deactiveDistrictsData = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post(
      "/api/regions/deactive-districts-details",
      finalData,
      config
    );
    dispatch(getAllDistricts());
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

export const getAllCountries = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/regions/get-all-countries");
    dispatch({
      type: ALL_COUNTRIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
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
      type: ERROR,
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
      type: ERROR,
    });
  }
};

export const getActiveCountry = (searchData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/regions/get-active-country", searchData);
    dispatch({
      type: ACTIVE_COUNTRY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getActiveState = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/regions/get-active-state");
    dispatch({
      type: ACTIVE_STATE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getActiveDistricts = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/regions/get-active-districts");
    dispatch({
      type: ACTIVE_DISTRICTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getStates = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/regions/get-state");
    dispatch({
      type: STATES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};
