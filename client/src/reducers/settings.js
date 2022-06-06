import { PAYMENT_MODE } from "../actions/types";

const initialState = {
  paymentMode: [],
};

const settings = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_MODE:
      return {
        ...state,
        paymentMode: payload,
      };

    default:
      return state;
  }
};

export default settings;
