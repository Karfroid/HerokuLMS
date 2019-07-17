import { homeutilsConstants } from "../constants";

let token = localStorage.getItem("usertoken");
const initialState = token ? token : {};

export function homeutils(state = initialState, action) {
  switch (action.type) {
    case homeutilsConstants.GETALL_REQUEST:
      return {
        loggedIn: true,
        homeData: action.data
      };
    default:
      return state;
  }
}
