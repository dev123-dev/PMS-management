import { ALL_LEADS } from "../actions/types";

const initialState = {
  allLeads: [],
};

const sct = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_LEADS:
      return {
        ...state,
        allLeads: payload,
      };

    default:
      return state;
  }
};

export default sct;
