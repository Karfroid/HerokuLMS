import { userConstants } from "../constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};
console.log(initialState);
export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_USER_DETAILS:
      return {
        user: state
      };
    case userConstants.CURRENTUSER_REQUEST:
      return {
        currentUser: action.currentuser
      };
    case userConstants.ALLUSER_REQUEST:
      return {
        userDetails: action.usersdetail
      };
    default:
      return state;
  }
}
