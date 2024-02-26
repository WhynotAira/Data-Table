
import React from 'react';

const DataTable = ({ data, itemsPerPage, currentPage }) => {

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

 
  const pageData = data.slice(startIndex, endIndex);

  return (
    <div>
      {/* Render your table with the subset of data */}
      <table>
        {/* Render rows based on pageData */}
      </table>
      {/* Render pagination controls */}
      <div>
        {/* Render pagination controls based on total items, items per page, and current page */}
      </div>
    </div>
  );
};

export default DataTable;
