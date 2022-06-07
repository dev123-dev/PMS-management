import {
  PAYMENT_MODE,
  ALL_DEPARTMENT,
  ALL_DESIGNATION,
} from "../actions/types";

const initialState = {
  paymentMode: [],
  allDeptartment: [],
  allDesignation: [],
};

const settings = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_MODE:
      return {
        ...state,
        paymentMode: payload,
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
    default:
      return state;
  }
};

export default settings;
