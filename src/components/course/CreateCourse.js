import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../../helpers/Form";
import { courseActions } from "../../actions";
import "../../css/course.css";
import Chapters from "./chapters";
import { connect } from "react-redux";
import { NavBar } from "../NavBar";

//let cId = 100;

class CreateCourse extends Form {
  state = {
    data: this.props.data,
    selectName: {},
    errors: {},
    cId: 101
  };

  schema = {
    Functions: Joi.string()
      .required()
      .label("Functional Group"),
    Project: Joi.string()
      .required()
      .label("Project"),
    Division: Joi.string()
      .required()
      .label("Division"),
    CourseName: Joi.string()
      .required()
      .label("Course Name"),
    CourseType: Joi.string()
      .required()
      .label("Course Type"),
    CourseDescription: Joi.string()
      .required()
      .label("Course Description")
    /* CourseChapter: Joi.Boolean()
      .required()
      .label("Course Chapters") */
  };

  doSubmit = () => {
    const { dispatch } = this.props;
    const data = { ...this.state.data };
    const cID = { ...this.state.cId };
    data["CourseID"] = this.state.cId;
    data["CourseOwnerID"] = JSON.parse(localStorage.getItem("user")).EmployeeID;
    data["CreatedDate"] = new Date();
    data["LastUpdatedate"] = new Date();
    data["IsActive"] = 1;
    this.setState({ cID: this.state.cId++ });
    dispatch(courseActions.create(data));
  };

  componentDidMount() {
    console.log(this.props);
    this.setState({ data: this.props.data });
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    //console.log("nn", this.state.data);
    const {
      Functions,
      Project,
      Division,
      CourseType,
      addedPerson,
      structure
    } = this.state.data;

    return (
      <div className="main">
        <NavBar />
        <div className="container">
          <div className="coure-container">
            <div className="course-title">
              <h1>Create Course</h1>
            </div>
            <div className="course-grid">
              <form onSubmit={this.handleSubmit}>
                <div className="course-grid-col">
                  {this.renderDropDown(
                    Functions,
                    "Functional Group",
                    "Functions"
                  )}
                  {this.renderDropDown(Division, "Division", "Division")}
                  {this.renderDropDown(CourseType, "Course Type", "CourseType")}
                </div>
                <div className="course-grid-col">
                  {this.renderDropDown(Project, "Project", "Project")}
                  {this.renderInput(
                    "CourseName",
                    "Course Name",
                    "CourseName",
                    "Course Name"
                  )}
                  {/* this.renderDropDown(addedPerson, "Added Person", "addedPerson") */}
                </div>
                <div className="course-grid-row">
                  {this.renderTextArea(
                    "Course Description",
                    "CourseDescription"
                  )}
                </div>

                <div className="course-grid-row">
                  <Chapters />
                </div>

                {this.renderButton("Submit", "btn-primary btn-block")}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapToStateToProps = state => {
  return { data: state.courseCreation };
};

export default connect(mapToStateToProps)(CreateCourse);

//export default CreateCourse;

/* function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return {
      loggedIn
    };
  }
  
  const connectedLoginPage = connect(mapStateToProps)(Login);
  export { connectedLoginPage as Login }; */
