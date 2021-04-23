import React, { useState } from 'react';
import Pagination from "@material-ui/lab/Pagination";


const PaginateTable = (props ) => {

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const pageSizes  = [5,10,20,50]

  function handlePageChange(event, value) {
      setPage(value)
      props.handlePagination(value,pageSize)
    }
    function handlePageSizeChange(event) {
      setPageSize(event.target.value)
      props.handlePagination(1,event.target.value)
    }
  
  return(
      <div className="mt-3">
                {"Items per Page: "}
        <select onChange={handlePageSizeChange} value={pageSize}>
                    {pageSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
        </select>

        <Pagination
          className="mt-3"
          count={props.count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </div>
  )  
}

export default PaginateTable;
