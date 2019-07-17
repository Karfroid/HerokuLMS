import React, { Component } from "react";
//import { Route } from "react-router-dom";
import { userActions } from "../actions";
import { persistStore } from "redux-persist";
import { history } from "../helpers";
import { connect } from "react-redux";
//import "../css/navbar.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  logout() {
    this.props.logout();
    history.push("/login");
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/home">LMS</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/Users">Users</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Settings
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>
                    <NavLink href="/ChangePassword">Change Password</NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logout}>Log out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
function mapStateToProps(state) {
  //console.log(state.authentication);
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(userActions.logout())
  };
};
const connectedNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
export { connectedNavBar as NavBar };
