import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class Table extends Component {
  render() {
    const { columns, sortColumn, onSort, data } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={data} columns={columns} />
      </table>
    );
  }
}

export default Table;
