import React, { useState } from "react";
import styled, { css } from "styled-components";

// Styled pagination wrapper
const PaginationWrapper = styled.div`
  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 16px;
    height: 44px;
    justify-content: center;
  }

  button {
    background-color: var(--background-color);
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 0px;
    width: 120px;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s ease-out;
    box-shadow: 6px 6px 0px var(--primary-color);

    &:disabled {
      background-color: #e0e0e0;
      cursor: not-allowed;
      box-shadow: none;
    }

    &:hover:not(:disabled) {
      background-color: var(--primary-color);
      color: var(--background-color);
      box-shadow: 8px 8px 0px var(--primary-color-dark);
    }
  }

  .page-info {
    color: var(--primary-color);
    font-size: 16px;
    text-align: center;
    display: inline-block; /* Keeps the text and input in line */
  }

  .page-input-wrapper {
    display: inline-block;
    display: flex;
    align-items: center;
  }

  .page-input-wrapper input {
    margin-left: 8px; /* Adds gap between "Page" and the input */
    width: 60px;
    padding: 5px;
    font-size: 16px;
    border: 2px solid var(--primary-color);
    border-radius: 0px;
    color: var(--primary-color);
    background-color: var(--background-color);
    transition: border-color 0.3s;

    &:focus {
      border-color: var(--primary-color-dark);
      outline: none;
    }
  }
`;

const Pagination = ({ filteredAnimeList, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(filteredAnimeList.length / itemsPerPage);

  const handlePageChange = (action) => {
    switch (action) {
      case "prev":
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        break;
      case "next":
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        break;
      default:
        break;
    }
  };

  const handleCustomPageChange = (e) => {
    const page = parseInt(e.target.value, 10);
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <PaginationWrapper>
      <div className="pagination-controls">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          title="Go to Previous Page"
        >
          Previous
        </button>

        {/* Page Information and Input */}
        <div className="page-input-wrapper">
          <span className="page-info">
            Page
            <input
              id="page-input"
              type="number"
              value={currentPage}
              onChange={handleCustomPageChange}
              min={1}
              max={totalPages}
              title="Enter a page number"
            />
            of {totalPages}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          title="Go to Next Page"
        >
          Next
        </button>
      </div>
    </PaginationWrapper>
  );
};

export default Pagination;
