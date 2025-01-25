import React from 'react';
import CustomDropdown from '../customDropdown.jsx';

const GenreFilter = ({ genresWithCount, selectedGenre, handleGenreChange }) => {
    // Add "All Genres" as the default option
    const genreOptions = [
        { value: '', label: 'All Genres', key: 'all' }, // Default option for all genres
        ...genresWithCount.map((genre, index) => ({
            value: genre.genre,
            label: `${genre.genre} (${genre.count})`,
            key: index
        }))
    ];

    // Handle case when selectedGenre is empty (no genre selected)
    const selectedValue = selectedGenre
        ? genreOptions.find(option => option.value === selectedGenre)
        : genreOptions[0]; // Default to "All Genres" when nothing is selected

    return (
        <div className="genre-filter">
            <CustomDropdown
                options={genreOptions}
                placeholder="Select Genre"
                onChange={handleGenreChange}
                value={selectedValue}
            />
        </div>
    );
};

export default GenreFilter;
