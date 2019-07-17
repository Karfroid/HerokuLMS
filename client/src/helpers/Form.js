import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import SelectDropDown from "./select";
import TextArea from "./textarea";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    //console.log(this.state.data, this.schema);
    const { error } = Joi.validate(this.state.data, this.schema, options);
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

  validateCustomProperty = ({ name, value }, thisschema) => {
    const options = { abortEarly: false };

    const obj = { [name]: value };
    const schema = { [name]: thisschema[name] };
    console.log("validation", obj, schema);
    const { error } = Joi.validate(obj, schema, options);
    //console.log(error);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ error: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderInput(name, label, type = "text", placeholder) {
    const { data, errors } = this.state;
    return (
      <Input
        key={name}
        type={type}
        name={name}
        value={data[name] || ""}
        label={label}
        placeholder={placeholder}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderButton(label, classname) {
    return (
      <button disabled={this.validate()} className={"btn " + classname}>
        {label}
      </button>
    );
  }

  renderDropDown(options, label, name) {
    const { data, selectName: selected, errors } = this.state;
    return (
      <SelectDropDown
        options={options}
        label={label}
        handleChange={this.handleChange}
        value={selected[name]}
        name={name}
      />
    );
  }

  renderTextArea(label, name) {
    const { data, errors } = this.state;
    return (
      <TextArea
        label={label}
        handleChange={this.handleChange}
        value={data[name] || ""}
        name={name}
      />
    );
  }
}

export default Form;
