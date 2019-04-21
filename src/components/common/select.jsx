import React from "react";

const Select = ({
  error,
  name,
  label,
  options,
  valueProperty,
  textProperty,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" name={name} id={name} {...rest}>
        <option value="" />
        {options.map(item => (
          <option key={item[valueProperty]} value={item[valueProperty]}>
            {item[textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Select.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};

export default Select;
