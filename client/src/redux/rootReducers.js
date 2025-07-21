import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import teamReducer from "../features/team/teamSlice";
import transferReducer from "../features/transfer/transferSlice";

const appReducer = combineReducers({
  auth: authReducer,
  team: teamReducer,
  transfer: transferReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
