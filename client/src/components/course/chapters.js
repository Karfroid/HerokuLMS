import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../../helpers/Input";
import ChapterTable from "./ChapterTable";

class Chapters extends Component {
  state = {
    data: { courseCount: "" },
    table: {
      title: ["Chapter", "Enter the Chapter Name", "Add Source files"],
      courseCount: ""
    },
    errors: {}
  };

  schema = {
    courseCount: Joi.string()
      .required()
      .label("Course Structure")
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    console.log(error);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const table = { ...this.state.table };
    table[input.name] = input.value;
    this.setState({ table });
  };

  render() {
    const { data, errors, table } = this.state;
    return (
      <div className="chaper">
        <Input
          key="number"
          type="number"
          name="courseCount"
          value={table["courseCount"]}
          label="Course Structure"
          placeholder="Course Structure"
          onChange={this.handleChange}
        />
        <ChapterTable tableDetail={table} />
      </div>
    );
  }
}

export default Chapters;
