import React from "react";

const SelectDropDown = ({ options, label, value, name, handleChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="select">{label}</label>

      <select
        value={value}
        name={name}
        className="form-control"
        onChange={handleChange}
      >
        <option selected disabled>
          Select an Option
        </option>
        {options.map((data, index) => (
          <option key={index} value={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropDown;
