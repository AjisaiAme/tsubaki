import React from "react";
import CustomDropdown from "../customDropdown.jsx";

const GenreFilter = ({ genresWithCount = [], selectedGenre, handleGenreChange, handleMenuClose, handleBlur }) => {
    const genreOptions = [
        { value: "", label: "All Genres", key: "all" }, // Default option for all genres
        ...(Array.isArray(genresWithCount) ? genresWithCount.map((genre, index) => ({
            value: genre.genre,
            label: `${genre.genre} (${genre.count})`,
            key: index,
        })) : []),
    ];

    const selectedValue = selectedGenre
        ? genreOptions.find((option) => option.value === selectedGenre)
        : genreOptions[0];

    return (
        <div className="genre-filter">
            <CustomDropdown
                options={genreOptions}
                placeholder="Select Genre"
                onChange={handleGenreChange}
                value={selectedValue}
                onMenuClose={handleMenuClose} // Pass handleMenuClose to reset on menu close
                onBlur={handleBlur} // Pass handleBlur to reset on blur
            />
        </div>
    );
};

export default GenreFilter;