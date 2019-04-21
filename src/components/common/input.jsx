import React from "react";

const Input = ({ error, name, label, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        id={name}
        name={name}
        // autoComplete="off"
        {...rest}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
