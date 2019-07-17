import React, { Component } from "react";

import { userActions } from "../actions";
import "../css/home.css";
import { NavBar } from "./NavBar";
import HomePOV from "./HomePOV";
import { connect } from "react-redux";
import { Users } from "./Users";
import { Dashboard } from "./Dashboard";
import { ChangePassword } from "./Settings/ChangePassword";
import { PrivateRoute } from "../helpers";

class Home extends Component {
  state = {};
  componentDidMount() {
    console.log("HOMEDIDMOUNT");
    this.props.dispatch(userActions.getUserDetail());
  }
  render() {
    return (
      <div className="main">
        <NavBar />
        <HomePOV />
        <div className="container">
          <PrivateRoute exact path="/home" component={Dashboard} />
          <PrivateRoute exact path="/users" component={Users} />
          <PrivateRoute
            exact
            path="/changepassword"
            component={ChangePassword}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.users;
  console.log(user);
  return {
    user
  };
}

const connectedHomePage = connect(mapStateToProps)(Home);
export { connectedHomePage as Home };
