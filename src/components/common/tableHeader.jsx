import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    if (!path) return;

    let sortColumn = { path, order: "asc" };
    if (
      this.props.sortColumn.path === path &&
      this.props.sortColumn.order === "asc"
    ) {
      sortColumn.order = "desc";
    }

    this.props.onSort(sortColumn);
  };

  getSortIcon = path => {
    if (path === this.props.sortColumn.path) {
      return <i className={`fa fa-sort-${this.props.sortColumn.order}`} />;
    }

    return null;
  };

  getStyle = column => (column.path ? { cursor: "pointer" } : null);

  render() {
    const { props, getStyle, raiseSort, getSortIcon } = this;

    return (
      <thead>
        <tr>
          {props.columns.map(column => {
            return (
              <th
                style={getStyle(column)}
                key={column.path || column.key}
                onClick={() => raiseSort(column.path)}
              >
                {column.label} {getSortIcon(column.path)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
