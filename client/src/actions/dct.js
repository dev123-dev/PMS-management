import axios from "axios";
import {
  // AUTH_ERROR,
  ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
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
