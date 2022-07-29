import { ALL_PROSPECTUS } from "../actions/types";

const initialState = {
  allClient: [],
};

const dct = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_PROSPECTUS:
      return {
        ...state,
        allProspectus: payload,
      };
    default:
      return state;
  }
};

export default dct;
