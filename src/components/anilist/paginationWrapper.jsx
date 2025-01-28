import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import PropTypes from 'prop-types';


// Styled pagination wrapper
const PaginationWrapper = styled.div`
  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 16px;
    height: 44px;
    justify-content: center;
    position: relative; /* Required for z-index to work */
    z-index: 10; /* Add z-index here */
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
    position: relative; /* Required for z-index to work */
    z-index: 5; /* Add z-index here */

    &:disabled {
      background-color: var(--background-color);
      cursor: not-allowed;
      box-shadow: none;
      z-index: 5; /* Ensure disabled buttons have the same z-index */
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
    position: relative; /* Required for z-index to work */
    z-index: 5; /* Add z-index here */
  }

  .page-input-wrapper {
    display: inline-block;
    display: flex;
    align-items: center;
    position: relative; /* Required for z-index to work */
    z-index: 5; /* Add z-index here */
  }

  .page-input-wrapper input {
    margin: .5rem; /* Adds gap between "Page" and the input */
    width: 60px;
    padding: 5px;
    font-size: 16px;
    border: 2px solid var(--primary-color);
    border-radius: 0px;
    color: var(--primary-color);
    background-color: var(--background-color);
    transition: border-color 0.3s;
    position: relative; /* Required for z-index to work */
    z-index: 5; /* Add z-index here */

    &:focus {
      border-color: var(--primary-color-dark);
      outline: none;
    }
  }
`;

const Pagination = ({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  onPageChange 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePageChange = useCallback((action) => {
    switch (action) {
      case 'prev':
        if (currentPage > 1) onPageChange(currentPage - 1);
        break;
      case 'next':
        if (currentPage < totalPages) onPageChange(currentPage + 1);
        break;
      default:
        break;
    }
  }, [currentPage, totalPages, onPageChange]);

  const handleCustomPageChange = useCallback((e) => {
    const page = parseInt(e.target.value, 10) || 1;
    const validatedPage = Math.min(Math.max(page, 1), totalPages);
    onPageChange(validatedPage);
  }, [totalPages, onPageChange]);

  if (totalItems <= itemsPerPage) return null;

  return (
    <PaginationWrapper>
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          aria-label="Go to Previous Page"
        >
          Previous
        </button>
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
              aria-label="Enter a page number"
            />
            of {totalPages}
          </span>
        </div>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          aria-label="Go to Next Page"
        >
          Next
        </button>
      </div>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;