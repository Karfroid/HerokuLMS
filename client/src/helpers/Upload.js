import React, { Component } from "react";
import Input from "./Input";
import axios from "axios";
import { connect } from "react-redux";
import { courseActions } from "../actions";

class Upload extends Component {
  state = {
    images: [],
    imageUrls: [],
    message: "",
    disabled: true
  };

  selectFiles = event => {
    let images = [];
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image =>
      image.name.match(/\.(doc|jpg|jpeg|png|gif)$/)
    );
    let message = `${images.length} valid files(s) selected`;
    let disabled = event.target.files.length > 0 ? false : true;
    this.setState({ images, message, disabled });
  };

  uploadImages = () => {
    alert(1);
    const uploaders = this.state.images.map(image => {
      const data = new FormData();
      data.append("image", image, image.name);
      const { dispatch } = this.props;
      dispatch(courseActions.upload(data));

      /* return axios.post("/courses/upload", data).then(response => {
        this.setState({
          imageUrl: [response.data.imageUrls, ...this.state.imageUrls]
        });
      }); */
    });

    //console.log("uploaders", uploaders);

    axios
      .all(uploaders)
      .then(res => {
        //console.log("done", res);
      })
      .catch(err => alert(err.message));
  };

  onUpload = () => {
    this.props.uploadData(this.props.data.courseCreation);
  };

  render() {
    console.log(this.props.data.courseCreation);
    return (
      <div className="form-upload">
        <Input type="file" onChange={this.selectFiles} />
        <button
          className="btn btn-primary"
          value="Submit"
          disabled={this.state.disabled}
          onClick={this.onUpload}
        >
          Upload
        </button>
      </div>
    );
  }
}

/* export default Upload; */

const mapaToStateToProps = state => {
  return { data: state };
};

export default connect(mapaToStateToProps)(Upload);
