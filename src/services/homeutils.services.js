import { apiClient } from "../helpers/axios";

export const homeutilsService = {
  getAllHome
};

function getAllHome(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return apiClient
    .get("home/getall?id=" + id, {
      headers: {
        authorization: user.token
      }
    })
    .then(res => {
      //console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}
