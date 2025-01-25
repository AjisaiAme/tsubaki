import React from 'react';

const ResetFilterButton = ({ onResetFilters }) => {
    return (
        <button onClick={onResetFilters} className="reset-button">
            Reset
        </button>
    );
};

export default ResetFilterButton;
