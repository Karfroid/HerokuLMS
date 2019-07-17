import React, { Component } from "react";

export class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSwitch(param) {
    const { homeData } = this.props;
    switch (param) {
      case "1":
        return (
          <div className="container py-4">
            <h3 className="py-4">Super Admin</h3>
          </div>
        );
      case "2":
        return (
          <div className="container py-4">
            <h3 className="py-4">Admin</h3>
          </div>
        );
      case "3":
        return (
          <div className="container py-4">
            <h3 className="py-4">My Progress</h3>
            <div className="card-deck">
              {homeData.map((item, index) => (
                <div className="card" key={item.TopicID}>
                  <img
                    className="card-img-top"
                    src="https://dummyimage.com/150x150/000/fff.jpg&text=FPO"
                    alt="Dummy Card"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.courseprogress.CourseName}
                    </h5>
                    <p className="card-text">
                      Topic Title: {item.CourseTopics} <br />
                      Format: {item.TopicType} <br />
                      Created Date: {item.CreatedDate}
                    </p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Last updated {item.LastUpdatedate} ago
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return "foo";
    }
  }

  render() {
    const { homeData, role } = this.props;
    console.log(role);
    if ("homeData" == undefined) {
      return null;
    } else {
      return <div>{this.renderSwitch(role)}</div>;
    }
  }
}
