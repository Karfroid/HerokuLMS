import React, { Component } from "react";

import { homeutilsActions } from "../actions";
import "../css/home.css";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import { UserDashboard } from "./UserDashboard";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeData: {},
      errors: {},
      user: {}
    };
  }
  componentDidMount() {
    console.log(this.props);
    //const { user } = this.props;
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user.EmployeeID);
    this.setState({ user: user });
    console.log("DIMOUNT");

    this.props.dispatch(homeutilsActions.getAllHome(user.EmployeeID));
  }
  render() {
    console.log(this.state);
    const { user } = this.state;
    const { homeData } = this.props;
    if (homeData == undefined) {
      return null;
    } else {
      return (
        <div className="container py-4">
          <UserDashboard homeData={homeData[0]} role={user.Role} />
          <h3 className="py-4">Popular</h3>
          <div className="card-deck">
            {homeData[1].map((item, index) => (
              <div className="card" key={index}>
                <img
                  className="card-img-top"
                  src="https://dummyimage.com/75x75/000/fff.jpg&text=FPO"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.CourseName}</h5>
                  <p className="card-text">
                    <small className="text-muted">
                      Assigned To {item.CNT} Users
                    </small>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <h3 className="py-4">Recently Added</h3>
          <div className="card-deck">
            {homeData[2].map((item, index) => (
              <div className="card" key={index}>
                <img
                  className="card-img-top"
                  src="https://dummyimage.com/75x75/000/fff.jpg&text=FPO"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.CourseName}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
function mapStateToProps(state) {
  console.log(state);
  const { user } = state.users;
  const { homeData } = state.homeutils;

  return {
    homeData,
    user
  };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };
