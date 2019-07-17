import { courseConstants } from "../constants";

const initCourseState = {
  Functions: ["Contenta", "Commerce", "General"],
  Project: ["Triad", "HR", "Pre-Media"],
  Division: [
    "General",
    "FED",
    "QA",
    "BPM",
    "BI",
    "AdOps",
    "Deployment",
    "Training"
  ],
  structure: ["Logana", "Ram", "Bharath", "Prasanna"],
  CourseType: ["SoftSkills", "Technical", "Policy Docs"]
};

const uploadData = {
  images: [],
  imageUrls: [],
  message: ""
};

export function courseCreation(state, action) {
  switch (action.type) {
    case courseConstants.COURSE_CREATE:
      return {
        initCourseState
      };
    case courseConstants.COURSE_UPLOAD:
      //console.log()
      return {
        data: action.fileName
      };
    default:
      return initCourseState;
  }
}

/* const courseReducer =( state = initCourseState, action ) => {
    return state;
}

export default courseReducer; */
