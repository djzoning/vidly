import React from "react";

const ListGroup = props => {
  const {
    items,
    onItemChange,
    selectedItem,
    valueProperty,
    textProperty
  } = props;
  const itemStyle = {
    cursor: "pointer"
  };
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          style={itemStyle}
          key={item[valueProperty]}
          onClick={() => onItemChange(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};

export default ListGroup;
