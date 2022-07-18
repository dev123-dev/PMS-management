import { ALL_COUNTRIES, ALL_STATES, ALL_DISTRICTS } from "../actions/types";

const initialState = {
  allCountries: [],
  allStates: [],
  allDistrics: [],
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
    case ALL_DISTRICTS:
      return {
        ...state,
        allDistrics: payload,
      };
    default:
      return state;
  }
};

export default regions;
