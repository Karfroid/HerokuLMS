import { apiClient } from "../helpers/axios";

export const courseService = {
  create,
  upload
};

let token = localStorage.getItem("user.token");

function create(courseData) {
  console.log(token);
  return apiClient
    .post("/courses/save", courseData, {
      headers: {
        authorization: token
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

function upload(uploadData) {
  console.log(uploadData);
  return apiClient
    .post("/courses/upload", uploadData)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}
