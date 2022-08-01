import {
  ALL_EMPLOYEE,
  USER_GROUPS,
  LAST_ENTERED_EMP_CODE,
  LEAVES,
  GET_LEAVES_STAFF,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  users: [],
  errorResponse: "",
  successResponse: "",
  savedMessage: "",
  allEmployee: [],
  userGroups: [],
  lastEnteredEmpCode: [],
  leaves: [],
  staffLeaves: [],
};

const user = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_EMPLOYEE:
      return {
        ...state,
        allEmployee: payload,
      };
    case USER_GROUPS:
      return {
        ...state,
        userGroups: payload,
      };
    case LAST_ENTERED_EMP_CODE:
      return {
        ...state,
        lastEnteredEmpCode: payload,
      };
    case LEAVES:
      return {
        ...state,
        leaves: payload,
      };
    case GET_LEAVES_STAFF:
      return {
        ...state,
        staffLeaves: payload,
      };

    default:
      return state;
  }
};

export default user;
