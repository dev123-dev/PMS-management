import {
  ALL_COUNTRIES,
  ALL_STATES,
  ALL_DISTRICTS,
  ACTIVE_COUNTRY,
  ACTIVE_STATE,
  ACTIVE_DISTRICTS,
} from "../actions/types";

const initialState = {
  allCountries: [],
  allStates: [],
  allDistrics: [],
  activeCountry: [],
  activeState: [],
  activeDistrics: [],
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
    case ACTIVE_COUNTRY:
      return {
        ...state,
        activeCountry: payload,
      };
    case ACTIVE_STATE:
      return {
        ...state,
        activeState: payload,
      };
    case ACTIVE_DISTRICTS:
      return {
        ...state,
        activeDistrics: payload,
      };
    default:
      return state;
  }
};

export default regions;
