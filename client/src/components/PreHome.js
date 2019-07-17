import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { PublicRoute } from "../helpers";
import "../css/prehome.css";

export class PreHome extends Component {
  state = {};
  render() {
    return (
      <div className="main">
        <div className="prehome-container">
          <nav className="navbar fixed-top transparent navbar-inverse">
            <a className="navbar-brand font-weight-bold text-danger" href="/">
              <h1>
                <span className="badge badge-danger">LMS</span>
              </h1>
            </a>
            <div className="form-inline">
              <button className="btn btn-danger my-2 my-sm-0">
                <Link to="/login">Login</Link>
              </button>
            </div>
          </nav>
          <img
            alt="PreHome"
            src={require("../media/PreHome.jpg")}
            className="prehome"
          />

          <div>
            <PublicRoute exact path="/login" component={Login} />
          </div>
        </div>
      </div>
    );
  }
}
