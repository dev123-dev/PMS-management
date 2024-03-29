import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
// import chat from "./chat";
import client from "./client";
import project from "./project";
import settings from "./settings";
import regions from "./regions";
import user from "./user";
import dct from "./dct";
import sct from "./sct";

export default combineReducers({
  alert,
  auth,
  // chat,
  client,
  project,
  settings,
  user,
  regions,
  dct,
  sct,
});
