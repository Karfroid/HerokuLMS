import React from "react";
import "./App.css";
import { Router } from "react-router-dom";
import { history } from "./helpers";
import { PreHome } from "./components/PreHome";
import { Home } from "./components/Home";
import CreateCourse from "./components/course/CreateCourse";
import { PublicRoute, PrivateRoute } from "./helpers";
//import { NotFound } from "./components/NotFound";

function App() {
  return (
    <Router history={history}>
      <div>
        <PublicRoute exact path="/" component={PreHome} />
        <PublicRoute path="/login" component={PreHome} />

        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/users" component={Home} />
        <PrivateRoute path="/changepassword" component={Home} />
        <PrivateRoute path="/course" component={CreateCourse} />
        {/* <Route component={NotFound} /> */}
      </div>
    </Router>
  );
}

export default App;
