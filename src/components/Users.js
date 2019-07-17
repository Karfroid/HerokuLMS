import React from "react";
import { Jumbotron, Container } from "reactstrap";
import { userActions } from "../actions";
import Form from "../helpers/Form";
import Joi from "joi-browser";
import { connect } from "react-redux";
import Input from "../helpers/Input";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Table
} from "reactstrap";
import classnames from "classnames";
class Users extends Form {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      data: {},
      errors: {},
      users: [],
      chanegpassworddata: {
        currentpassword: "",
        newpassword: "",
        repeatpassword: ""
      },
      newuser: {}
    };
  }

  newuserschema = {
    eid: Joi.number()
      .required()
      .label("EmployeeID"),
    lastname: Joi.string()
      .required()
      .label("LastName"),
    firstname: Joi.string()
      .required()
      .label("FirstName"),
    email: Joi.string()
      .required()
      .email()
      .label("EmailID"),
    functions: Joi.string()
      .required()
      .label("Functions"),
    project: Joi.string()
      .required()
      .label("Project"),
    division: Joi.string()
      .required()
      .label("Division"),
    role: Joi.string()
      .required()
      .label("Role"),
    image: Joi.string()
      .required()
      .label("Image"),
    active: Joi.string()
      .required()
      .label("Active"),
    flag: Joi.boolean()
      .required()
      .label("Flag"),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .label("New Password"),
    againpassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } })
  };

  componentDidMount() {
    const { user, dispatch } = this.props;
    dispatch(userActions.getCurrentUser(user.EmployeeID));
    console.log(this.props);
    this.setState({ user: user });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.currentUser != undefined)
      this.setState({ data: nextProps.currentUser });

    if (nextProps.userDetails != undefined)
      this.setState({ users: nextProps.userDetails });

    /* this.setState({
      data: nextProps.currentUser,
      users: nextProps.userDetails
    }); */
  }
  toggle(tab) {
    if (tab === "2") {
      this.props.dispatch(userActions.getUsersDetail());
    }
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  newuservalidate = () => {
    //const changepasswordschema = {

    const options = { abortEarly: false };
    //console.log(this.state.chanegpassworddata, this.changepasswordschema);
    const { error } = Joi.validate(
      this.state.newuser,
      this.newuserschema,
      options
    );
    //console.log(error);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    //console.log(errors);
    return errors;
  };

  handleNewUserChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateCustomProperty(input, this.newuserschema);
    console.log(errorMessage);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const newuser = { ...this.state.newuser };
    newuser[input.name] = input.value;

    this.setState({ newuser, errors });
  };

  handleNewUserSubmit = e => {
    e.preventDefault();
    console.log("Submitted", this.state.newuser);
    this.props.dispatch(
      userActions.userRegister(this.state.user.EmployeeID, this.state.newuser)
    );

    /* const errors = this.validate();
    console.log("Submitted", errors);
    this.setState({ error: errors || {} });
    if (errors) return; */

    //this.doSubmit();
  };

  navTab = user => {
    if (user) {
      switch (user.Role) {
        case "1":
          return (
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  My Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Users Detail
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "3"
                  })}
                  onClick={() => {
                    this.toggle("3");
                  }}
                >
                  New User
                </NavLink>
              </NavItem>
            </Nav>
          );
        case "2":
          return (
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  My Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Users Detail
                </NavLink>
              </NavItem>
            </Nav>
          );
        case "3":
          return (
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  My Profile
                </NavLink>
              </NavItem>
            </Nav>
          );
        default:
          return "Error";
      }
    }
  };

  render() {
    console.log(this.state);
    const {
      data,
      users,
      chanegpassworddata,
      errors,
      newuser,
      user
    } = this.state;
    if (data) {
      var formInput = Object.keys(data).map(key => this.renderInput(key, key));
    }
    if (users) {
      var tableRow = users.map((item, index) => (
        <tr key={index}>
          <th scope="row">{item.EmployeeID}</th>
          <td>{item.Image}</td>
          <td>{item.FirstName}</td>
          <td>{item.EmailID}</td>
          <td>{item.Functions}</td>
          <td>{item.Project}</td>
          <td>{item.Division}</td>
        </tr>
      ));
    }

    return (
      <div>
        <div>
          <Nav tabs>{this.navTab(user)}</Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Jumbotron fluid>
                    <Container fluid>
                      <h3 className="display-5">My Profile</h3>
                      <div className="main-userform">
                        <form onSubmit={this.handleSubmit}>{formInput}</form>
                      </div>
                    </Container>
                  </Jumbotron>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <h4>User Details</h4>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Emp ID</th>
                        <th>profile</th>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>Function</th>
                        <th>Project</th>
                        <th>Division</th>
                      </tr>
                    </thead>
                    <tbody>{tableRow}</tbody>
                  </Table>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <h4>Add New User</h4>
                  <form onSubmit={this.handleNewUserSubmit}>
                    <Input
                      type="text"
                      name="eid"
                      value={newuser["eid"]}
                      label="Employee ID"
                      placeholder="Employee ID"
                      onChange={this.handleNewUserChange}
                      error={errors["eid"]}
                    />
                    <Input
                      type="text"
                      name="lastname"
                      value={newuser["lastname"]}
                      label="Last Name"
                      placeholder="Last Name"
                      onChange={this.handleNewUserChange}
                      error={errors["lastname"]}
                    />
                    <Input
                      type="text"
                      name="firstname"
                      value={newuser["firstname"]}
                      label="First Name"
                      placeholder="First Name"
                      onChange={this.handleNewUserChange}
                      error={errors["firstname"]}
                    />
                    <Input
                      type="text"
                      name="email"
                      value={newuser["email"]}
                      label="Email"
                      placeholder="Email"
                      onChange={this.handleNewUserChange}
                      error={errors["email"]}
                    />
                    <Input
                      type="text"
                      name="functions"
                      value={newuser["functions"]}
                      label="Functions"
                      placeholder="Functions"
                      onChange={this.handleNewUserChange}
                      error={errors["functions"]}
                    />
                    <Input
                      type="text"
                      name="project"
                      value={newuser["project"]}
                      label="Project"
                      placeholder="Project"
                      onChange={this.handleNewUserChange}
                      error={errors["project"]}
                    />
                    <Input
                      type="text"
                      name="division"
                      value={newuser["division"]}
                      label="Division"
                      placeholder="Division"
                      onChange={this.handleNewUserChange}
                      error={errors["division"]}
                    />
                    <Input
                      type="text"
                      name="role"
                      value={newuser["role"]}
                      label="Role"
                      placeholder="Role"
                      onChange={this.handleNewUserChange}
                      error={errors["role"]}
                    />
                    <Input
                      type="text"
                      name="image"
                      value={newuser["image"]}
                      label="Image"
                      placeholder="Image"
                      onChange={this.handleNewUserChange}
                      error={errors["image"]}
                    />
                    <Input
                      type="text"
                      name="active"
                      value={newuser["active"]}
                      label="Active"
                      placeholder="Active"
                      onChange={this.handleNewUserChange}
                      error={errors["active"]}
                    />
                    <Input
                      type="text"
                      name="flag"
                      value={newuser["flag"]}
                      label="Flag"
                      placeholder="Flag"
                      onChange={this.handleNewUserChange}
                      error={errors["flag"]}
                    />
                    <Input
                      type="password"
                      name="password"
                      value={newuser["password"]}
                      label="Password"
                      placeholder="Password"
                      onChange={this.handleNewUserChange}
                      error={errors["password"]}
                    />
                    {
                      <Input
                        type="password"
                        name="againpassword"
                        value={newuser["againpassword"]}
                        label="Repeat Password"
                        placeholder="Repeat Password"
                        onChange={this.handleNewUserChange}
                        error={errors["againpassword"]}
                      />
                    }
                    <button
                      disabled={this.newuservalidate()}
                      className={"btn btn-primary"}
                    >
                      Submit
                    </button>
                  </form>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  const { currentUser, user, userDetails } = state.users;
  //console.log(user);
  return {
    user,
    currentUser,
    userDetails
  };
}
const connectedUsersPage = connect(mapStateToProps)(Users);
export { connectedUsersPage as Users };
