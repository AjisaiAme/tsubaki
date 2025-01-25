import React from 'react';

const GenreDisplay = ({ genres }) => {
    return (
        <div className="genres-container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="genre-icon"
            >
                <path d="M2 7.75C2 5.67893 3.67893 4 5.75 4H10.397C11.0325 4 11.6407 4.23705 12.092 4.65566L20.3443 11.6557C21.165 12.3605 21.184 13.6377 20.3875 14.3705L14.3875 19.8705C13.6051 20.5882 12.3517 20.5135 11.6296 19.6983L4.65566 11.592C4.23705 11.1313 4 10.5281 4 9.897V5.75C4 4.7835 4.7835 4 5.75 4H10.397H5.75ZM8 6.75C7.30964 6.75 6.75 7.30964 6.75 8C6.75 8.69036 7.30964 9.25 8 9.25C8.69036 9.25 9.25 8.69036 9.25 8C9.25 7.30964 8.69036 6.75 8 6.75Z" />
            </svg>
            <p className="genres">
                <i>{genres.length ? genres.join(', ') : 'No genres available'}</i>
            </p>
        </div>
    );
};

export default GenreDisplay;
