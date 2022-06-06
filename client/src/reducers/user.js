import { ALL_EMPLOYEE, USER_GROUPS } from "../actions/types";

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

    default:
      return state;
  }
};

export default user;
