import React from "react";

const TextArea = ({ label, value, name, handleChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="select">{label}</label>

      <textarea
        type="textarea"
        className="form-control"
        value={value}
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};

export default TextArea;
