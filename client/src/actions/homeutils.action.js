import { homeutilsConstants } from "../constants";
import { homeutilsService } from "../services";

export const homeutilsActions = {
  getAllHome
};
function getAllHome(userid) {
  return dispatch => {
    homeutilsService.getAllHome(userid).then(
      data => {
        //console.log(data);
        dispatch({ type: homeutilsConstants.GETALL_REQUEST, data });
        //history.push("/home");
      },
      error => {
        console.log(error, "error");
      }
    );
  };
}
