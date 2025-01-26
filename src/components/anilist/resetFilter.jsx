import React from "react";

const ResetFilterButton = ({ onResetFilters }) => {
  return (
    <button
      className="reset-button"
      onClick={onResetFilters}
    >
      Reset Filters
    </button>
  );
};

export default ResetFilterButton;