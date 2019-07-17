import { userConstants } from "../constants";
import { userService } from "../services";
import { history } from "../helpers";

export const userActions = {
  login,
  logout,
  register,
  getCurrentUser,
  getUserDetail,
  getUsersDetail,
  changePassword,
  userRegister
};
function userRegister(id, data) {
  console.log("pass", id, data);
  return dispatch => {
    userService.userRegister(id, data).then(
      response => {
        console.log(response);
        dispatch({ type: userConstants.REGISTER_REQUEST, response });
      },
      error => {
        console.log(error, "error");
      }
    );
  };
}
function changePassword(id, data) {
  console.log("pass", id, data);
  return dispatch => {
    userService.changePassword(id, data).then(
      response => {
        console.log(response);
        dispatch({ type: userConstants.CURRENTUSER_CHANGEPASSWORD, response });
      },
      error => {
        console.log(error, "error");
      }
    );
  };
}
function getUserDetail() {
  return dispatch => {
    var userdetails = userService.getUserDetail();
    dispatch({ type: userConstants.GET_USER_DETAILS, userdetails });
  };
}
function getUsersDetail() {
  return dispatch => {
    userService.getUsersDetail().then(
      usersdetail => {
        console.log(usersdetail);
        dispatch({ type: userConstants.ALLUSER_REQUEST, usersdetail });
        //history.push("/home");
      },
      error => {
        console.log(error, "error");
      }
    );
  };
  /* return dispatch => {
    var userdetails = userService.getUsersDetail();
    //console.log(userDetails);
    dispatch({ type: userConstants.ALLUSER_REQUEST, usersdetail });
    /*  userService.getUserDetail().then(
      userdetails => {
        dispatch({ type: userConstants.GET_USER_DETAILS, userdetails });
      },
      error => {
        console.log(error, "error");
      }
    ); 
  }; */
}
function login(username, password) {
  return dispatch => {
    userService.login(username, password).then(
      token => {
        dispatch({ type: userConstants.LOGIN_SUCCESS, token });
        history.push("/home");
      },
      error => {
        console.log(error, "error");
      }
    );
  };
}

function logout() {
  return dispatch => {
    userService.logout();
    dispatch({ type: userConstants.LOGOUT });
  };
}

function register() {}

function getCurrentUser(userid) {
  return dispatch => {
    userService.getCurrentUser(userid).then(
      currentuser => {
        dispatch({ type: userConstants.CURRENTUSER_REQUEST, currentuser });
        //history.push("/home");
      },
      error => {
        console.log(error, "error");
      }
    );
  };
}
