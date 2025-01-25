import React from 'react';

const DateDisplay = ({ startedAt, completedAt, formatDate }) => {
    const renderDates = () => {
        try {
            if (startedAt && formatDate(startedAt) && completedAt && formatDate(completedAt)) {
                return (
                    <>
                        <p>{formatDate(startedAt)} to</p>
                        <p>{formatDate(completedAt)}</p>
                    </>
                );
            } else if (startedAt && formatDate(startedAt)) {
                return <p>Started {formatDate(startedAt)}</p>;
            } else if (completedAt && formatDate(completedAt)) {
                return <p>Finished {formatDate(completedAt)}</p>;
            } else {
                return <p>N/A</p>;
            }
        } catch (error) {
            console.error("Error formatting dates:", error);
            return <p>N/A</p>;
        }
    };

    return (
        <div className="date-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="calendar-icon">
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

export default DateDisplay;
