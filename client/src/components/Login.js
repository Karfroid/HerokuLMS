import React from "react";
import Form from "../helpers/Form";
import Joi from "joi-browser";
import "../css/login.css";
import { userActions } from "../actions";
import { connect } from "react-redux";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };
  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .label("Password")
  };

  doSubmit = () => {
    //call the server
    const { dispatch } = this.props;
    const { email, password } = this.state.data;
    console.log("Submitted", this.state.data);
    dispatch(userActions.login(email, password));
  };

  render() {
    return (
      <div className="main-login">
        <h1 className="text-center mb-2">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login", "btn-danger btn-block")}
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login };
