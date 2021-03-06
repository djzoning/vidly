import React from "react";

const SearchBox = ({ onChange, value }) => {
  return (
    <input
      onChange={e => onChange(e.currentTarget.value)}
      value={value}
      placeholder="Search..."
      className="form-control my-3"
    />
  );
};

export default SearchBox;
