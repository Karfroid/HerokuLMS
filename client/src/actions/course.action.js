import { courseConstants } from "../constants";
import { courseService } from "../services";
import { history } from "../helpers";

export const courseActions = {
  create,
  upload
};
function create(courseData) {
  return dispatch => {
    courseService.create(
      courseData
    ); /* .then(
      token => {
        console.log("totke", token);
        dispatch({ type: courseConstants.COURSE_CREATE, token });
      },
      error => {
        console.log(error, "error");
      }
    ); */
  };
}
function upload(courseData) {
  return dispatch => {
    courseService.upload(courseData).then(
      fileName => {
        //console.log("totke", fileName);
        dispatch({ type: courseConstants.COURSE_UPLOAD, fileName });
      },
      error => {
        console.log(error, "error");
      }
    );
  };
}
