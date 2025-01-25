// GenreFilter.js
import React from 'react';
import CustomDropdown from '../customDropdown.jsx';

const GenreFilter = ({ genresWithCount, selectedGenre, handleGenreChange }) => {
    const genreOptions = genresWithCount.map(genre => ({
        value: genre.genre,
        label: `${genre.genre} (${genre.count})`
    }));

    return (
        <div className="genre-filter">
            <CustomDropdownWrapper>
                <CustomDropdown
                    options={genreOptions}
                    placeholder="Select Genre"
                    onChange={handleGenreChange}
                    value={selectedGenre}
                />
            </CustomDropdownWrapper>
        </div>
    );
};

export default GenreFilter;
