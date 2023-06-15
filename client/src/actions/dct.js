import axios from "axios";
import {
  // AUTH_ERROR,
  ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  ALL_LEADS,
  ALL_LEADS_DD,
  LAST_MSG,
  CALLHISTORY,
  GET_ALL_LEADS,
  GET_ALL_LEADS_DD,
  ALL_DCT_CLIENTS,
  ALL_DCT_CLIENTS_DD,
  DCT_CLIENTS,
  DCT_CLIENTS_DD,
  ALL_DCT_CALLS,
  ALL_DCT_CALLS_EMP,
  ALL_LEADS_EMP,
  GET_ALL_LEADS_EMP,
  ALL_DCT_CLIENTS_EMP,
  DCT_CLIENTS_EMP,
  GET_LEADS_LIST,
  GET_SELECTED_LEADS,
  GET_STAFF_DATA,
  GET_INSTRUCTION_DATA,
  ALL_ASSIGNED_LEAD_DETAILS,
  DCT_CALLS_CLIENT_COUNT,
  DCT_CALLS_COUNT,
  ALL_DCT_LEAD_ENTRY_TODAY,
  GET_ALL_LEADS_ENTERED_BY,
  GET_LEADS_ENTERED_BY,
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

export const addDctClientDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/add-dct-client", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addDctCalls = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    const res = await axios.post("/api/dct/add-dct-calls", finalData, config);
    const res2 = await axios.post(
      "/api/dct/update-dct-leads-status",
      finalData,
      config
    );
    dispatch(refreshLead(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addDctClientCalls = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    const res = await axios.post("/api/dct/add-dct-calls", finalData, config);
    const res2 = await axios.post(
      "/api/dct/update-dct-clients-status",
      finalData,
      config
    );
    if (finalData.filterData) {
      dispatch(getDctClientDetails(finalData.filterData));
      dispatch(getDctClientDetailsDD(finalData.filterData));
    }
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
export const editDctLeadDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/edit-dct-Leads", finalData, config);
    dispatch(refreshLead(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const editDctClientsDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/edit-dct-clients", finalData, config);
    dispatch(getAllDctClient());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addNewDctStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/add-new-dct-staff", finalData, config);
    dispatch(getStaffsData(finalData.staffFilter));
    dispatch(refreshLead(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addNewDctClientStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/add-new-dct-client-staff", finalData, config);
    if (finalData.staffFilter) dispatch(getStaffsData(finalData.staffFilter));
    if (finalData.filterData) {
      dispatch(getDctClientDetails(finalData.filterData));
      dispatch(getDctClientDetailsDD(finalData.filterData));
    }
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addNewDctClientInstructionDetails =
  (finalData) => async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_TRUE,
      });
      await axios.post(
        "/api/dct/add-new-dctclient-instruction",
        finalData,
        config
      );
      if (finalData.filterData) {
        dispatch(getDctClientDetails(finalData.filterData));
        dispatch(getDctClientDetailsDD(finalData.filterData));
      }
      dispatch({
        type: SET_LOADING_FALSE,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
      });
    }
  };

export const editDctStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/edit-dct-staff", finalData, config);
    dispatch(getStaffsData(finalData.staffFilter));
    dispatch(refreshLead(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};
export const editDctClientStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/edit-dct-client-staff", finalData, config);
    if (finalData.staffFilter) dispatch(getStaffsData(finalData.staffFilter));
    if (finalData.filterData) {
      dispatch(getDctClientDetails(finalData.filterData));
      dispatch(getDctClientDetailsDD(finalData.filterData));
    }
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const editDctClientInstructionDetails =
  (finalData) => async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_TRUE,
      });
      await axios.post(
        "/api/dct/edit-dctclient-instruction-details",
        finalData,
        config
      );
      if (finalData.instructionFilter)
        dispatch(getInstructionData(finalData.instructionFilter));
      if (finalData.filterData) {
        dispatch(getDctClientDetails(finalData.filterData));
        dispatch(getDctClientDetailsDD(finalData.filterData));
      }
      dispatch({
        type: SET_LOADING_FALSE,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
      });
    }
  };

export const deactivateDctStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/deactivate-dct-staff", finalData, config);
    dispatch(getStaffsData(finalData.staffFilter));
    dispatch(refreshLead(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};
export const deactivateDctClientStaffDetails =
  (finalData) => async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_TRUE,
      });
      await axios.post(
        "/api/dct/deactivate-dct-client-staff",
        finalData,
        config
      );
      if (finalData.staffFilter) dispatch(getStaffsData(finalData.staffFilter));
      if (finalData.filterData) {
        dispatch(getDctClientDetails(finalData.filterData));
        dispatch(getDctClientDetailsDD(finalData.filterData));
      }
      dispatch({
        type: SET_LOADING_FALSE,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
      });
    }
  };

export const deactivateDctLeadDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/deactivate-dct-Leads", finalData, config);
    dispatch(refreshLead(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const deactivateDctClient = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/deactivate-dct-client", finalData, config);
    dispatch(getAllDctClient());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const refreshLead = (finalData) => async (dispatch) => {
  try {
    if (finalData.filterData && finalData.filterData.dctLeadCategory) {
      dispatch(getDctLeadDetails(finalData.filterData));
      dispatch(getDctLeadDetailsDD(finalData.filterData));
    }
    dispatch(getAllDctLead());
    dispatch(getAllDctLeadDD());
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

//**********************************SELECT**********************************
export const getDctLeadDetails = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/get-dct-Leads", finalData, config);
    dispatch({
      type: ALL_LEADS,
      payload: res.data.result1,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getEmpLeadAssignedDetails = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/get-skill-details", finalData);
    // localStorage.setItem("allDesignationData", JSON.stringify(res.data));
    dispatch({
      type: ALL_ASSIGNED_LEAD_DETAILS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const TransferLeads = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_FALSE,
    });
    await axios.post("/api/dct/transfer-lead", finalData);

    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};
export const getDctLeadDetailsDD = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/get-dct-Leads", finalData, config);
    dispatch({
      type: ALL_LEADS_DD,
      payload: res.data.result1,
    });
    if (finalData === undefined || (finalData && finalData.emp !== true)) {
      dispatch({
        type: ALL_LEADS_EMP,
        payload: res.data.result2,
      });
    }
    dispatch({
      type: GET_LEADS_ENTERED_BY,
      payload: res.data.result3,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllDctLead = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/dct/get-all-dct-Leads",
      finalData,
      config
    );

    dispatch({
      type: GET_ALL_LEADS,
      payload: res.data.result1,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllDctLeadDD = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/dct/get-all-dct-Leads",
      finalData,
      config
    );
    dispatch({
      type: GET_ALL_LEADS_DD,
      payload: res.data.result1,
    });
    if (finalData === undefined || (finalData && finalData.emp !== true)) {
      dispatch({
        type: GET_ALL_LEADS_EMP,
        payload: res.data.result2,
      });
    }
    dispatch({
      type: GET_ALL_LEADS_ENTERED_BY,
      payload: res.data.result3,
    });
    dispatch({
      type: "DCT_ALL_LEADS_COUNT",
      payload: res.data.result4,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getDctClientDetails = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/get-dct-clients", finalData, config);
    dispatch({
      type: DCT_CLIENTS,
      payload: res.data.result1,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getDctClientDetailsDD = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/get-dct-clients", finalData, config);
    dispatch({
      type: DCT_CLIENTS_DD,
      payload: res.data.result1,
    });
    if (finalData === undefined || (finalData && finalData.emp !== true)) {
      dispatch({
        type: DCT_CLIENTS_EMP,
        payload: res.data.result2,
      });
    }
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllDctClient = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/dct/get-all-dct-clients",
      finalData,
      config
    );
    dispatch({
      type: ALL_DCT_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllDctClientDD = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/dct/get-all-dct-clients",
      finalData,
      config
    );
    dispatch({
      type: ALL_DCT_CLIENTS_DD,
      payload: res.data,
    });
    if (finalData === undefined || (finalData && finalData.emp !== true)) {
      dispatch({
        type: ALL_DCT_CLIENTS_EMP,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getLastmessage = (searchData) => async (dispatch) => {
  try {
    dispatch({
      type: LAST_MSG,
      payload: "",
    });
    const res = await axios.post("/api/dct/get-last-message", searchData);
    dispatch({
      type: LAST_MSG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getCallHistory = (searchData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/get-call-history", searchData);
    dispatch({
      type: CALLHISTORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllDctCall = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/dct/get-all-dct-calls",
      finalData,
      config
    );
    dispatch({
      type: ALL_DCT_CALLS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllDctCallEmp = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/dct/get-all-dct-calls-emp",
      finalData,
      config
    );
    dispatch({
      type: ALL_DCT_CALLS_EMP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getLeadsList = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/get-leads-list", finalData, config);
    dispatch({
      type: GET_LEADS_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getSelectedLead = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/dct/get-selected-lead",
      finalData,
      config
    );
    dispatch({
      type: GET_SELECTED_LEADS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getStaffsData = (finalData) => async (dispatch) => {
  try {
    let res = [];
    if (finalData.staffFrom === "lead") {
      res = await axios.post(
        "/api/dct/get-lead-staffs-data",
        finalData,
        config
      );
    } else if (finalData.staffFrom === "client") {
      res = await axios.post(
        "/api/dct/get-client-staffs-data",
        finalData,
        config
      );
    }
    dispatch({
      type: GET_STAFF_DATA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getInstructionData = (finalData) => async (dispatch) => {
  try {
    let res = [];

    res = await axios.post(
      "/api/dct/get-client-instruction-data",
      finalData,
      config
    );

    dispatch({
      type: GET_INSTRUCTION_DATA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllDctCallCount = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/dct/get-all-dct-calls-count",
      finalData,
      config
    );
    dispatch({
      type: DCT_CALLS_COUNT,
      payload: res.data.getAllDctCallsCount,
    });
    dispatch({
      type: DCT_CALLS_CLIENT_COUNT,
      payload: res.data.getAllDctCallsClient,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllDctLeadToday = (filterData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/dct/get-all-today-dct-lead-entered",
      filterData
    );
    dispatch({
      type: ALL_DCT_LEAD_ENTRY_TODAY,
      payload: res.data.allDctLeadEnteredToday,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addImportDctLeadData = (changeData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/dct/add-import-dct-lead-data",
      changeData
    );
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};
