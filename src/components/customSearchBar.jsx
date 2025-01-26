import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomSearchWrapper from '../styles/customSearchWrapper';

const SearchBar = ({ value = '', onSearch, placeholder = 'Search...', context = '' }) => {
  const [query, setQuery] = useState(value);

  useEffect(() => {
      console.log('SearchBar value updated:', value); // Debugging
      setQuery(value); // Sync the internal state with the parent's value
  }, [value]);

  const handleChange = (event) => {
      const newValue = event.target.value;
      setQuery(newValue); // Update local state
      onSearch(newValue); // Pass the new value to the parent component
  };

  const handleClear = () => {
      setQuery('');
      onSearch(''); // Clear the search term in the parent
  };

  return (
      <CustomSearchWrapper context={context}>
          <div className="search-input__control">
              <input
                  type="text"
                  className="search-input__text"
                  value={query}
                  onChange={handleChange}
                  placeholder={placeholder}
                  aria-label="Search"
              />
              {query && (
                  <button className="search-input__clear" onClick={handleClear} aria-label="Clear search">
                      &times;
                  </button>
              )}
          </div>
      </CustomSearchWrapper>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  context: PropTypes.string,
};

export default SearchBar;