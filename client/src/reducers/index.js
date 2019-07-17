import { combineReducers } from "redux";
import { users } from "./user.reducer";
import { authentication } from "./authentication.reducer";
import { courseCreation } from "./course.reducer.js";
import { homeutils } from "./homeutils.reducer.js";
import { userConstants } from "../constants";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  users,
  authentication,
  courseCreation,
  homeutils
});

const rootReducer = (state, action) => {
  if (action.type === userConstants.LOGOUT) {
    console.log("logout");
    state = undefined;
    localStorage.removeItem("persist:root");
    storage.removeItem("persist:root");
    localStorage.removeItem("persist:root");
  }

  return appReducer(state, action);
};

export default rootReducer;
