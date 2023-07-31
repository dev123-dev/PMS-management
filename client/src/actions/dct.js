import axios from "axios";
import {
  ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  ALL_LEADS,
  LAST_MSG,
  CALLHISTORY,
  GET_ALL_LEADS,
  ALL_DCT_CLIENTS,
  ALL_DCT_CLIENTS_DD,
  DCT_CLIENTS,
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

export const activateDctLeadOrClient = (finalData) => async (dispatch) => {
  try {
    await axios.post("/api/dct/activate-alead-or-aclient", finalData, config);
    dispatch(getDeactiveLeadsClients(finalData));
  } catch (error) {
    console.log(error);
  }
}

//Get all deactivated leads or clients whose status is deactive and have not been assigned to anyone (which means null) so that they can be handled here
export const getDeactiveLeadsClients = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/dct/deactive-leads-clients", finalData, config);
    dispatch({
      type: "DEACTIVE_LEADS_CLIENTS",
      payload: res.data
    })
  } catch (error) {
    console.log(error);
  }
}

// Gets all Inactive Clients whose current category is Not Equal to IC and UW Unworthy clients are shown in the bottom by sort 
export const getInactiveClients = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/dct/inactive-clients");
    dispatch({
      type: "INACTIVE_CLIENTS",
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
  }
}

// Gets all Inactive Clients whose current category is Equal to IC and Call Date is less than todays date
export const getInactiveClientsFollowUp = () => async (dispatch) => {
  //console.log("Action Exec");
  try {
    const res = await axios.get("/api/dct/inactive-clients-followup");
    dispatch({
      type: "INACTIVE_CLIENTS_FOLLOWUP",
      payload: res.data
    })
  } catch (error) {
    console.log(error);
  }
}

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
    console.log("Error: ", err);
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
    } else {
      if (finalData.staffFilter && finalData.staffFilter.from === "Inactive") {
        dispatch(getInactiveClients());
      } else if (finalData.staffFilter && finalData.staffFilter.from === "InactiveClient")
        dispatch(getInactiveClientsFollowUp());
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
  console.log("Check", finalData);
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/add-new-dct-client-staff", finalData, config);
    if (finalData.staffFilter) dispatch(getStaffsData(finalData.staffFilter));
    if (finalData.filterData) {
      dispatch(getDctClientDetails(finalData.filterData));
    } else {
      if (finalData.staffFilter.from === "Inactive")
        dispatch(getInactiveClients());
      else if (finalData.staffFilter.from === "InactiveClient")
        dispatch(getInactiveClientsFollowUp());
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
      } else {
        if (finalData.staffFilter && finalData.staffFilter.from === "Inactive")
          dispatch(getInactiveClients());
        else if (finalData.staffFilter && finalData.staffFilter.from === "InactiveClient")
          dispatch(getInactiveClientsFollowUp());
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

export const changeDeactivateLeadClientStatus = () => (dispatch) => {
  dispatch({
    type: "LEAD_CLIENT_DEACTIVATED",
    payload: false
  });
}

export const deactivateDctLeadDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/dct/deactivate-dct-Leads", finalData, config);
    dispatch({
      type: "LEAD_CLIENT_DEACTIVATED",
      payload: true
    });
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
    if (finalData.staffFilter) {
      if (finalData.staffFilter.from === "AllLeads")
        dispatch(getAllDctLead(finalData.filterData));
      else if (finalData.staffFilter.from === "Prospect" || finalData.staffFilter.from === "FollowUp" || finalData.staffFilter.from === "WrongNumber")
        dispatch(getDctLeadDetails(finalData.filterData));
      else if (finalData.staffFilter.from === "TestClient" || finalData.staffFilter.from === "RegularClient")
        dispatch(getDctClientDetails(finalData.filterData));
      else if (finalData.staffFilter.from === "DeactiveLeads")
        dispatch(getDeactiveLeadsClients(finalData.filterData))
    }
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

//**********************************SELECT**********************************
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

export const getAllDctLead = (finalData) => async (dispatch) => {
  dispatch({
    type: "ALL_DCT_LEADS_INITIALIZE"
  });
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
    dispatch({
      type: "ALL_DCT_LEADS_LOADED"
    });
    dispatch({
      type: "LEAD_CLIENT_DEACTIVATED",
      payload: false
    })
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getDctLeadDetails = (finalData) => async (dispatch) => {
  dispatch({
    type: "DCT_LEADS_INITIALIZE"
  })
  try {
    const res = await axios.post("/api/dct/get-dct-Leads", finalData, config);
    dispatch({
      type: ALL_LEADS,
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
    dispatch({
      type: "DCT_LEADS_LOADED"
    })
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getDctClientDetails = (finalData) => async (dispatch) => {
  dispatch({
    type: "DCT_CLIENTS_INITIALIZE"
  })
  try {
    const res = await axios.post("/api/dct/get-dct-clients", finalData, config);
    dispatch({
      type: DCT_CLIENTS,
      payload: res.data.result1,
    });

    if (finalData === undefined || (finalData && finalData.emp !== true)) {
      dispatch({
        type: DCT_CLIENTS_EMP,
        payload: res.data.result2,
      });
    }
    dispatch({
      type: "DCT_CLIENTS_LOADED"
    })
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllDctClient = (finalData) => async (dispatch) => {
  dispatch({
    type: "ALL_DCT_CLIENTS_INITIALIZE"
  });
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

export const getStaffsData = (finalData) => async (dispatch) => { //Joel 18-07-2023 conditional change
  if (!finalData.from) return;
  dispatch({
    type: "GET_STAFF_DATA_INITIALIZE"
  });
  try {
    let res = [];
    if (finalData.from === "TestClient" ||
      finalData.from === "RegularClient" ||
      finalData.from === "AllClients" ||
      finalData.from === "Inactive" ||
      finalData.from === "InactiveClient") {
      res = await axios.post(
        "/api/dct/get-client-staffs-data",
        finalData,
        config
      );
    } else {
      res = await axios.post(
        "/api/dct/get-lead-staffs-data",
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
      payload: res.data.dctCallsSalesEmpCount,
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
