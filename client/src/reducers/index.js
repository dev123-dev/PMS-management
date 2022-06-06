import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
// import chat from "./chat";
import client from "./client";
import project from "./project";
import settings from "./settings";
import user from "./user";

export default combineReducers({
  alert,
  auth,
  // chat,
  client,
  project,
  settings,
  user,
});
