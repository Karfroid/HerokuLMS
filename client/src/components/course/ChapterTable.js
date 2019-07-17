import React, { Component } from "react";
import Input from "../../helpers/Input";
import Upload from "../../helpers/Upload";
import { connect } from "react-redux";

class ChapterTable extends Component {
  uploadData = data => {
    console.log(data);
  };
  tablecontent = count => {
    let tableBody = [];
    for (let i = 0; i < count; i++) {
      tableBody.push(
        <div className="chapter-row" key={i}>
          <div>Chapter - {i + 1}</div>
          <div>
            <Input />
          </div>
          <div>
            <Upload
              filePath="assets/user/"
              naming="user"
              dataUploaded={this.uploadData}
            />
          </div>
        </div>
      );
    }
    return tableBody;
  };

  render() {
    //console.log(this.props);
    const { tableDetail } = this.props;
    if (tableDetail.courseCount == 0) return false;
    return (
      <div className="chapter-table">
        <div className="chapter-title">
          {tableDetail.title.map(title => (
            <div className="chapter-col" key={title}>
              {title}
            </div>
          ))}
        </div>
        <div className="chapter-body">
          {this.tablecontent(tableDetail.courseCount)}
        </div>
      </div>
    );
  }
}

/* export default ChapterTable; */

const mapToStateToProps = state => {
  return { data: state.data };
};

export default connect(mapToStateToProps)(ChapterTable);
