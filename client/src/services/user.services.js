import { apiClient } from "../helpers/axios";

export const userService = {
  login,
  logout,
  register,
  getCurrentUser,
  getUserDetail,
  getUsersDetail,
  changePassword,
  userRegister
};

let user = JSON.parse(localStorage.getItem("user"));

function getUserDetail() {
  console.log(user);
  return user;
}

function userRegister(id, data) {
  return apiClient
    .post("/users/register?id=" + id, data, {
      headers: {
        Authorization: user.token
      }
    })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}

function getUsersDetail() {
  return apiClient
    .get("/users/getalluser", {
      headers: {
        Authorization: user.token
      }
    })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}

function login(username, password) {
  return apiClient
    .post("/users/login", {
      email: username,
      password: password
    })
    .then(res => {
      console.log("local set");
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(res.data));
      //console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  localStorage.removeItem("persist:root");
}

function register() {}
function getCurrentUser(id) {
  return apiClient
    .get("/users/getcurrentuser?id=" + id, {
      headers: {
        Authorization: user.token
      }
    })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}
function changePassword(id, data) {
  return apiClient
    .post("/users/changepassword?id=" + id, data, {
      headers: {
        Authorization: user.token
      }
    })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}
