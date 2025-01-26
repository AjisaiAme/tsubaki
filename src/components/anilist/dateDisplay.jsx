import React from 'react';
import PropTypes from 'prop-types';

const DateDisplay = ({ startedAt, completedAt, formatDate }) => {
  const renderDates = () => {
    if (!startedAt && !completedAt) return <p>N/A</p>;

    const formattedStart = startedAt && formatDate(startedAt);
    const formattedEnd = completedAt && formatDate(completedAt);

    if (formattedStart && formattedEnd) {
      return (
        <>
          <p>{formattedStart} to</p>
          <p>{formattedEnd}</p>
        </>
      );
    } else if (formattedStart) {
      return <p>Started {formattedStart}</p>;
    } else if (formattedEnd) {
      return <p>Finished {formattedEnd}</p>;
    } else {
      return <p>N/A</p>;
    }
  };

  return (
    <div className="date-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="calendar-icon"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
          clipRule="evenodd"
        />
      </svg>
      {renderDates()}
    </div>
  );
};

DateDisplay.propTypes = {
  startedAt: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
  }),
  completedAt: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
  }),
  formatDate: PropTypes.func.isRequired,
};

export default DateDisplay;