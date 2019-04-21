import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  const range = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-md">
        {range.map(page => (
          <li
            onClick={() => onPageChange(page)}
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
