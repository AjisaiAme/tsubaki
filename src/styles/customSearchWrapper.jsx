import React, { useRef } from "react";
import styled from "styled-components";

const CustomSearchWrapper = styled.div`
  position: relative;
  z-index: 20;

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
    width: 100%;
    height: 44px;
    transition: all 0.3s ease;
    z-index: 21;

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
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    color: var(--primary-color);
    font-size: 16px;
    z-index: 22;
    transition: all 0.3s ease;

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
    flex-shrink: 0;
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

const CustomSearchInput = () => {
  const inputRef = useRef(null);

  const handleClearClick = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <CustomSearchWrapper>
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
          placeholder="Search for titles, genres, tags..."
          ref={inputRef}
        />
        <button className="search-input__clear" onClick={handleClearClick}>&times;</button>
      </div>
    </CustomSearchWrapper>
  );
};

export default CustomSearchInput;