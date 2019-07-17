import React from "react";

const Input = ({ type, name, label, value, error, onChange, placeholder }) => {
  return (
    <div className="form-group" key={name}>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
