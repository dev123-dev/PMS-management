import {
  PAYMENT_MODE,
  ALL_DEPARTMENT,
  ALL_DESIGNATION,
  ALL_STAFF_NAMES,
  ACTIVE_DESIGNATION,
  ALL_FEEDBACK,
} from "../actions/types";

const initialState = {
  paymentMode: [],
  allDeptartment: [],
  allDesignation: [],
  activeDesignation: [],
  allFeedback: [],
};

const settings = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_MODE:
      return {
        ...state,
        paymentMode: payload,
      };
    case ALL_STAFF_NAMES:
      return {
        ...state,
        allStaffName: payload,
      };
    case ALL_DEPARTMENT:
      return {
        ...state,
        allDepartment: payload,
      };
    case ALL_DESIGNATION:
      return {
        ...state,
        allDesignation: payload,
      };
    case ACTIVE_DESIGNATION:
      return {
        ...state,
        activeDesignation: payload,
      };
    case ALL_FEEDBACK:
      return {
        ...state,
        allFeedback: payload,
      };
    default:
      return state;
  }
};

export default settings;
