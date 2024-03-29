import {
  ALL_COUNTRIES,
  ALL_STATES,
  ALL_DISTRICTS,
  ACTIVE_COUNTRY,
  ACTIVE_STATE,
  ACTIVE_DISTRICTS,
  ACTIVE_STAFF_DISTRICTS,
  STATES,
} from "../actions/types";

const initialState = {
  allCountries: [],
  allStates: [],
  allDistrics: [],
  activeCountry: [],
  activeState: [],
  activeDistricts: [],
  statesData: [],
  activeStaffDistricts: [],
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
        activeDistricts: payload,
      };
    case ACTIVE_STAFF_DISTRICTS:
      return {
        ...state,
        activeStaffDistricts: payload,
      };
    case STATES:
      return {
        ...state,
        statesData: payload,
      };

    default:
      return state;
  }
};

export default regions;
