import axios from "axios";
import {
  // AUTH_ERROR,
  ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  ALL_SCT_LEADS,
  ALL_SCT_LEADS_DD,
  ALL_SCT_LEADS_EMP,
  GET_ALL_SCT_LEADS,
  GET_ALL_SCT_LEADS_DD,
  GET_ALL_SCT_LEADS_EMP,
  SCT_LAST_MSG,
  SCTCALLHISTORY,
  ALL_SCT_PROJECT,
  ALL_DEMOS,
  SCT_PROJECT,
  SCHEDULED_DEMOS,
  ALL_SCT_CALLS,
  ALL_SCT_CALLS_EMP,
  DEMO_STATES,
  DEMO_LEADS,
  DEMO_CHECK,
  SCT_CLIENTS,
  SCT_CLIENTS_DD,
  SCT_CLIENTS_EMP,
  PO_PRINT,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//ADD

export const addSctLeadDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-sct-Leads", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addSctClientDetails = (transferData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-sct-client", transferData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addNewSctStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-new-sct-staff", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addNewSctClientStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-new-sct-client-staff", finalData, config);
    // dispatch(getStaffsData(finalData.staffFilter));
    // if (finalData.filterData) {
    //   dispatch(getSctClientDetails(finalData.filterData));
    //   dispatch(getSctClientDetailsDD(finalData.filterData));
    // }
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const saveQuotation = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-quotation", finalData, config);
    // dispatch(getRegenerateData({ clientId: finalData.clientId }));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const savePurchaseOrder = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-purchase-order", finalData, config);
    dispatch(getPurchaseOrderPrint({ clientId: finalData.clientId }));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};
export const saveInvoice = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-invoice", finalData, config);
    dispatch(getInvoicePrint({ clientId: finalData.clientId }));
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
export const editSctLeadDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/edit-sct-Leads", finalData, config);
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

export const editSctStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/edit-sct-staff", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const editSctClientStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/edit-sct-client-staff", finalData, config);
    // dispatch(getStaffsData(finalData.staffFilter));
    // if (finalData.filterData) {
    //   dispatch(getSctClientDetails(finalData.filterData));
    //   dispatch(getSctClientDetailsDD(finalData.filterData));
    // }
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

//DEACTIVE

export const deactivateSctLeadDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/deactivate-sct-Leads", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const deactivateSctStaffDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/deactivate-sct-staff", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const deactivateSctClientStaffDetails =
  (finalData) => async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_TRUE,
      });
      await axios.post(
        "/api/sct/deactivate-sct-client-staff",
        finalData,
        config
      );
      // dispatch(getStaffsData(finalData.staffFilter));
      // if (finalData.filterData) {
      //   dispatch(getSctClientDetails(finalData.filterData));
      //   dispatch(getSctClientDetailsDD(finalData.filterData));
      // }
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
    if (finalData.filterData) {
      dispatch(getSctLeadDetails(finalData.filterData));
      dispatch(getSctLeadDetailsDD(finalData.filterData));
    }
    dispatch(getAllSctLead());
    dispatch(getAllSctLeadDD());
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};
//**********************************SELECT**********************************
//LEAD
export const getSctLeadDetails = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/get-sct-Leads", finalData, config);
    dispatch({
      type: ALL_SCT_LEADS,
      payload: res.data.result1,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getSctLeadDetailsDD = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/get-sct-Leads", finalData, config);
    dispatch({
      type: ALL_SCT_LEADS_DD,
      payload: res.data.result1,
    });
    if (finalData === undefined || (finalData && finalData.emp !== true)) {
      dispatch({
        type: ALL_SCT_LEADS_EMP,
        payload: res.data.result2,
      });
    }
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

//ALL LEADS
export const getAllSctLead = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/sct/get-all-sct-Leads",
      finalData,
      config
    );
    dispatch({
      type: GET_ALL_SCT_LEADS,
      payload: res.data.result1,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllSctLeadDD = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/sct/get-all-sct-Leads",
      finalData,
      config
    );
    dispatch({
      type: GET_ALL_SCT_LEADS_DD,
      payload: res.data.result1,
    });
    if (finalData === undefined || (finalData && finalData.emp !== true)) {
      dispatch({
        type: GET_ALL_SCT_LEADS_EMP,
        payload: res.data.result2,
      });
    }
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

//CLIENT
export const getSctClientDetails = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/get-sct-clients", finalData, config);
    dispatch({
      type: SCT_CLIENTS,
      payload: res.data.result1,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getSctClientDetailsDD = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/get-sct-clients", finalData, config);
    dispatch({
      type: SCT_CLIENTS_DD,
      payload: res.data.result1,
    });
    if (finalData === undefined || (finalData && finalData.emp !== true)) {
      dispatch({
        type: SCT_CLIENTS_EMP,
        payload: res.data.result2,
      });
    }
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};
//**************
export const getSctLastmessage = (searchData) => async (dispatch) => {
  try {
    dispatch({
      type: SCT_LAST_MSG,
      payload: "",
    });
    const res = await axios.post("/api/sct/get-sct-last-message", searchData);
    dispatch({
      type: SCT_LAST_MSG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addSctCalls = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    const res = await axios.post("/api/sct/add-sct-calls", finalData, config);
    const res2 = await axios.post(
      "/api/sct/update-sct-leads-status",
      finalData,
      config
    );
    // dispatch(refreshLead(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addSctClientCalls = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    const res = await axios.post("/api/sct/add-sct-calls", finalData, config);
    const res2 = await axios.post(
      "/api/sct/update-sct-clients-status",
      finalData,
      config
    );
    // if (finalData.filterData) {
    //   dispatch(getDctClientDetails(finalData.filterData));
    //   dispatch(getDctClientDetailsDD(finalData.filterData));
    // }
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getCallHistory = (searchData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/get-call-history", searchData);
    dispatch({
      type: SCTCALLHISTORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getALLSctProjects = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/sct/get-all-sct-projects");
    localStorage.setItem("allSctProjectData", JSON.stringify(res.data));
    dispatch({
      type: ALL_SCT_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const AddSctNewProject = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-sct-project", finalData, config);
    dispatch(getALLSctProjects());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const addDemo = (demoData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/add-demo", demoData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const editSctProject = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/edit-sct-project", finalData);
    dispatch(getALLSctProjects());
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getProjectList = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/get-sct-project");
    dispatch({
      type: SCT_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getALLDemos = (filterData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/get-all-demos", filterData);
    const res2 = await axios.post("/api/sct/get-all-demos-state", filterData);
    const res3 = await axios.post("/api/sct/get-all-demos-leads", filterData);
    dispatch({
      type: ALL_DEMOS,
      payload: res.data,
    });
    dispatch({
      type: DEMO_STATES,
      payload: res2.data,
    });
    dispatch({
      type: DEMO_LEADS,
      payload: res3.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const demoTaken = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_FALSE,
    });
    await axios.post("/api/sct/demo-taken-verify", finalData);
    dispatch(getALLDemos(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getDemoSchedules = (searchData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/get-demo-schedules", searchData);
    dispatch({
      type: SCHEDULED_DEMOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllSctCall = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/sct/get-all-sct-calls",
      finalData,
      config
    );
    dispatch({
      type: ALL_SCT_CALLS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getAllSctCallEmp = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/sct/get-all-sct-calls-emp",
      finalData,
      config
    );
    dispatch({
      type: ALL_SCT_CALLS_EMP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const checkDemo = (client) => async (dispatch) => {
  try {
    dispatch({
      type: DEMO_CHECK,
      payload: null,
    });
    const res = await axios.post("/api/sct/check-demo", client);
    dispatch({
      type: DEMO_CHECK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

// export const getRegenerateData = (client) => async (dispatch) => {
//   try {
//     localStorage.removeItem("getRegenerate");
//     const res = await axios.post("/api/sct/check-regenerate", client);
//     localStorage.setItem("getRegenerate", JSON.stringify(res.data));
//   } catch (err) {
//     dispatch({
//       type: ERROR,
//     });
//   }
// };

export const editSctClientDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/edit-sct-Clients", finalData, config);
    // dispatch(refreshLead(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const deactivateSctClientDetails = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    await axios.post("/api/sct/deactivate-sct-Clients", finalData, config);
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getPurchaseOrderPrint = (client) => async (dispatch) => {
  try {
    dispatch({
      type: PO_PRINT,
      payload: null,
    });
    const res = await axios.post("/api/sct/po-print", client);
    localStorage.setItem("poPrintLS", JSON.stringify(res.data));
    dispatch({
      type: PO_PRINT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const getInvoicePrint = (client) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/invoice-print", client);
    localStorage.setItem("invoicePrintLS", JSON.stringify(res.data));
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const uploadPOFile = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    localStorage.removeItem("sctClientData");
    await axios.post("/api/sct/upload-po-file", finalData, config);
    // dispatch(refreshSelectedClient(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const refreshSelectedClient = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sct/selected-client", finalData);

    localStorage.setItem("sctClientData", JSON.stringify(res.data));
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};

export const uploadAgreement = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    localStorage.removeItem("sctClientData");
    await axios.post("/api/sct/upload-agreement-file", finalData, config);
    // dispatch(refreshSelectedClient(finalData));
    dispatch({
      type: SET_LOADING_FALSE,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
    });
  }
};
