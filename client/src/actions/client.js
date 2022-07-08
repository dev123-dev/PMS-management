import axios from "axios";
import {
  AUTH_ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  ALL_CLIENTS,
  ACTIVE_CLIENTS,
  ACTIVE_CLIENT_FILTER,
  ALL_DJS_CLIENTS,
  ALL_VERF_CLIENTS,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//ADD

export const AddClient = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/client/add-client", finalData, config);
    dispatch(getAllClients());
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

export const EditClient = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/client/edit-client", finalData);
    dispatch(getAllClients());
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

export const deactiveClient = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/client/deactive-client", finalData, config);
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

export const getAllClients = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/client/get-all-client");
    dispatch({
      type: ALL_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getActiveClients = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/client/get-active-client");
    localStorage.setItem("allClientBelongsToData", JSON.stringify(res.data));
    dispatch({
      type: ACTIVE_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getActiveClientsFilter = (clientTypeVal) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/client/get-active-client-filter",
      clientTypeVal
    );
    localStorage.setItem("activeClientData", JSON.stringify(res.data));
    dispatch({
      type: ACTIVE_CLIENT_FILTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getDailyjobSheetClients = (selDateData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/client/get-dailyjobsheet-client",
      selDateData
    );
    dispatch({
      type: ALL_DJS_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getVerificationClients = (selDateData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/client/get-verification-client",
      selDateData
    );
    dispatch({
      type: ALL_VERF_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
