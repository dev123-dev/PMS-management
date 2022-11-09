import {
  ALL_EMPLOYEE,
  USER_GROUPS,
  LAST_ENTERED_EMP_CODE,
  LEAVES,
  GET_LEAVES_STAFF,
  LEAVE_TYPECAT_MODE,
  MARKETING_EMPLOYEE,
  ALL_DCT_STAFF_NAMES,
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
  leaveCatMode: [],
  staffLeaves: [],
  marketingEmployees: [],
  allDctStaffName: [],
};

const user = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LEAVE_TYPECAT_MODE:
      return {
        ...state,
        leaveCatMode: payload,
      };
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
    case MARKETING_EMPLOYEE:
      return {
        ...state,
        marketingEmployees: payload,
      };
    case ALL_DCT_STAFF_NAMES:
      return {
        ...state,
        allDctStaffName: payload,
      };

    default:
      return state;
  }
};

export default user;
