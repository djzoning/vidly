import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  createKey(movie, column) {
    return movie._id + (column.path || column.key);
  }

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(movie => (
          <tr key={movie._id}>
            {columns.map(column => {
              if (column.content) {
                return (
                  <td key={this.createKey(movie, column)}>
                    {column.content(movie)}
                  </td>
                );
              }

              let value = _.get(movie, column.path);
              return <td key={this.createKey(movie, column)}>{value}</td>;
            })}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
