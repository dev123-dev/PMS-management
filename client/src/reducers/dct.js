import { ALL_PROSPECTUS, ALL_PROSPECTUS_DD } from "../actions/types";

const initialState = {
  allProspectus: [],
  allProspectusDD: [],
};

const dct = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_PROSPECTUS:
      return {
        ...state,
        allProspectus: payload,
      };
    case ALL_PROSPECTUS_DD:
      return {
        ...state,
        allProspectusDD: payload,
      };

    default:
      return state;
  }
};

export default dct;
