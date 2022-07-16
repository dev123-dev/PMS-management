import { ALL_COUNTRIES, ALL_STATES } from "../actions/types";

const initialState = {
  allCountries: [],
  allStates: [],
};

const regions = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_COUNTRIES:
      return {
        ...state,
        allCountries: payload,
      };
    case ALL_STATES:
      return {
        ...state,
        allState: payload,
      };
    default:
      return state;
  }
};

export default regions;
