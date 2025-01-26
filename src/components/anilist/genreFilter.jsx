import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import CustomDropdown from '../customDropdown.jsx';

const GenreFilter = ({ genresWithCount = [], selectedGenre, handleGenreChange, handleMenuClose, handleBlur }) => {
  const genreOptions = useMemo(() => [
    { value: '', label: 'All Genres', key: 'all' },
    ...genresWithCount.map((genre, index) => ({
      value: genre.genre,
      label: `${genre.genre} (${genre.count})`,
      key: index,
    })),
  ], [genresWithCount]);

  const selectedValue = useMemo(() => (
    selectedGenre ? genreOptions.find((option) => option.value === selectedGenre) : genreOptions[0]
  ), [selectedGenre, genreOptions]);

  return (
    <div className="genre-filter">
      <CustomDropdown
        options={genreOptions}
        placeholder="Select Genre"
        onChange={handleGenreChange}
        value={selectedValue}
        onMenuClose={handleMenuClose}
        onBlur={handleBlur}
      />
    </div>
  );
};

GenreFilter.propTypes = {
  genresWithCount: PropTypes.arrayOf(
    PropTypes.shape({
      genre: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
  selectedGenre: PropTypes.string,
  handleGenreChange: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func,
  handleBlur: PropTypes.func,
};

export default GenreFilter;