import { ALL_PROSPECTUS, ALL_PROSPECTUS_DD, LAST_MSG } from "../actions/types";

const initialState = {
  allProspectus: [],
  allProspectusDD: [],
  lastMsg: [],
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
    case LAST_MSG:
      return {
        ...state,
        lastMsg: payload,
      };

    default:
      return state;
  }
};

export default dct;
