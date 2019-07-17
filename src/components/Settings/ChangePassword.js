import React from "react";
import { userActions } from "../../actions";
import Form from "../../helpers/Form";
import Joi from "joi-browser";
import { connect } from "react-redux";
import Input from "../../helpers/Input";
import { Row, Col } from "reactstrap";
import classnames from "classnames";
class ChangePassword extends Form {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      users: [],
      chanegpassworddata: {}
    };
  }

  changepasswordschema = {
    currentpassword: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .label("Old Password"),
    newpassword: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .label("New Password"),
    repeatpassword: Joi.any()
      .valid(Joi.ref("newpassword"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } })
  };
  componentDidMount() {
    const { user, dispatch } = this.props;
    dispatch(userActions.getCurrentUser(user.EmployeeID));
    console.log(this.props);
    this.setState({ user: user });
  }
  componentWillReceiveProps(nextProps) {}
  changepasswordvalidate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(
      this.state.chanegpassworddata,
      this.changepasswordschema,
      options
    );
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const options = { abortEarly: false };

    var errorMessage = this.validateCustomProperty(
      input,
      this.changepasswordschema
    );
    if (input.name === "repeatpassword") {
      console.log(this.state.chanegpassworddata, input.value);
      if (this.state.chanegpassworddata.newpassword === input.value) {
        errorMessage = null;
        console.log(errorMessage);
      }
    }
    console.log(errorMessage);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const chanegpassworddata = { ...this.state.chanegpassworddata };
    chanegpassworddata[input.name] = input.value;
    this.setState({ chanegpassworddata, errors });
  };

  handleChangePasswordSubmit = e => {
    e.preventDefault();
    console.log("Submitted", this.state.chanegpassworddata);
    this.props.dispatch(
      userActions.changePassword(
        this.state.user.EmployeeID,
        this.state.chanegpassworddata
      )
    );
  };

  render() {
    console.log(this.state);
    const { chanegpassworddata, errors, user } = this.state;
    return (
      <div>
        <Row>
          <Col sm="12">
            <h4>Change Password</h4>
            <form onSubmit={this.handleChangePasswordSubmit}>
              <Input
                type="password"
                name="currentpassword"
                value={chanegpassworddata["currentpassword"] || ""}
                label="Current Password"
                placeholder="Current Password"
                onChange={this.handleChange}
                error={errors["currentpassword"]}
              />
              <Input
                type="password"
                name="newpassword"
                value={chanegpassworddata["newpassword"] || ""}
                label="New Password"
                placeholder="New Password"
                onChange={this.handleChange}
                error={errors["newpassword"]}
              />
              <Input
                type="password"
                name="repeatpassword"
                value={chanegpassworddata["repeatpassword"] || ""}
                label="Repeat Password"
                placeholder="Repeat Password"
                onChange={this.handleChange}
                error={errors["repeatpassword"]}
              />
              <button
                disabled={this.changepasswordvalidate()}
                className={"btn btn-primary"}
              >
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  const { user } = state.users;
  return {
    user
  };
}
const connectedChangePasswordPage = connect(mapStateToProps)(ChangePassword);
export { connectedChangePasswordPage as ChangePassword };
