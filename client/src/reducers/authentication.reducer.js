import { userConstants } from "../constants";

let user = JSON.parse(localStorage.getItem("user"));
console.log(user);
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        token: action.token
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
