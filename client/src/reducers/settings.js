import { PAYMENT_MODE, ALL_DEPARTMENT } from "../actions/types";

const initialState = {
  paymentMode: [],
  allDeptartment: [],
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
        allDeptartment: payload,
      };
    default:
      return state;
  }
};

export default settings;
