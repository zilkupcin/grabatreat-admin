import React from "react";
import { Pagination as AntPagination } from "antd";

const Pagination = ({ currentPage, onChange, total, resultsPerPage }) => {
  if (total === 0) {
    return null;
  }

  return (
    <div className="pagination">
      <AntPagination
        total={total}
        current={currentPage}
        defaultPageSize={resultsPerPage}
        onChange={onChange}
      />
    </div>
  );
};

export default Pagination;
