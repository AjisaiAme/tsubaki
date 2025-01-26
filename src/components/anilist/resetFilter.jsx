import React from 'react';
import PropTypes from 'prop-types';

const ResetFilterButton = ({ onResetFilters }) => {
  return (
    <button
      className="reset-button"
      onClick={onResetFilters}
      aria-label="Reset Filters"
    >
      Reset Filters
    </button>
  );
};

ResetFilterButton.propTypes = {
  onResetFilters: PropTypes.func.isRequired,
};

export default ResetFilterButton;