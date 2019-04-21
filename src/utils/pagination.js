import _ from "lodash";

export default (items, page, pageSize) => {
  const start = (page - 1) * pageSize;
  const movies = _(items)
    .slice(start)
    .take(pageSize)
    .value();
  return movies;
};
