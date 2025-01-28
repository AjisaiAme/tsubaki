import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const CustomSearchWrapper = styled.div`
  position: relative;
  z-index: 20;
  width: 100%; /* Ensure it takes the full width of its container */
  max-width: 100%; /* Prevent it from overflowing */

  .search-input__control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--background-color);
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    border-radius: 0px;
    padding: 5px 10px;
    box-shadow: none;
    width: 100%; /* Take full width of parent */
    max-width: 100%; /* Prevent overflow */
    height: 100%;
    transition: all 0.3s ease;
    z-index: 21;
    box-sizing: border-box; /* Include padding and border in width calculation */

    &:focus-within {
      box-shadow: 8px 8px 0px var(--primary-color);
      background-color: var(--primary-color);
      color: var(--background-color);
      border: 2px solid var(--background-color);
    }
  }

  .search-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0; /* Prevent icon container from shrinking */

    svg {
      width: 24px;
      height: 24px;
      fill: var(--primary-color);
      transition: fill 0.3s ease;
    }
  }

  .search-input__control:focus-within .search-icon-container svg {
    fill: var(--background-color);
  }

  .search-input__text {
    background-color: transparent;
    width: 100%; /* Take remaining space */
    padding: 10px;
    border: none;
    outline: none;
    color: var(--primary-color);
    font-size: 16px;
    z-index: 22;
    transition: all 0.3s ease;
    flex-grow: 1;
    box-sizing: border-box;

    ::placeholder {
      color: var(--primary-color);
      transition: color 0.3s ease;
    }

    &:focus {
      color: var(--background-color);
    }
  }

  .search-icon {
    margin-right: 10px;
    fill: var(--primary-color);
    width: 24px;
    height: 24px;
    flex-shrink: 0; /* Prevent icon from shrinking */
  }

  .search-input__clear {
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: 24px;
    cursor: pointer;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 23;
    transition: all 0.3s ease;
    flex-shrink: 0; /* Prevent clear button from shrinking */

    &:hover {
      transform: scale(1.2);
    }
  }

  .search-input__control:focus-within .search-input__clear {
    color: var(--background-color);
  }

  ${(props) =>
    props.context === "parameters" &&
    css`
      .search-input__control {
        width: 100%;
        background-color: var(--background-color);
      }
    `}
`;

const anilistSearchBar = ({ value = '', onSearch, placeholder = 'Search...', context = '' }) => {
  const [query, setQuery] = useState(value);
  const timeoutRef = useRef(null);

  // Immediate sync with parent value changes
  useEffect(() => {
    if (value !== query) {
      setQuery(value);
      onSearch(value);
    }
  }, [value]);

  // Handle user input with debounce
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (query !== value) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <CustomSearchWrapper context={context}>
      <div className="search-input__control">
        <div className="search-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="search-icon"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          className="search-input__text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label="Search"
        />
        {query && (
          <button className="search-input__clear" onClick={handleClear}>
            &times;
          </button>
        )}
      </div>
    </CustomSearchWrapper>
  );
};

anilistSearchBar.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  context: PropTypes.string,
};

export default anilistSearchBar;