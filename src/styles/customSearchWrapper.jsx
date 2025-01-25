import styled, { css } from "styled-components";

/**
 * Custom styled wrapper for the search input
 */
const CustomSearchWrapper = styled.div`
  /* Force a new stacking context for the search input wrapper */
  position: relative; /* Create a new stacking context */
  z-index: 20; /* Ensure the search input is above the glyph */

  /* Style for the input wrapper */
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

    z-index: 21; /* Ensure the control is above the wrapper */
    
    /* Focused or opened state for the control */
    &:focus-within {
      box-shadow: 8px 8px 0px var(--primary-color);
      background-color: var(--primary-color);
      color: var(--background-color);
      border: 2px solid var(--secondary-color);
    }
  }

  /* Style for the input text field */
  .search-input__text {
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--primary-color);
    font-size: 16px;
    transition: color 0.3s ease;

    ::placeholder {
      color: var(--primary-color);
    }

    &:focus {
      color: var(--background-color);
    }

    z-index: 22; /* Ensure the text is above the control */
  }

  /* Style for the clear button */
  .search-input__clear {
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: 20px;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: var(--secondary-color);
    }

    z-index: 23; /* Ensure the clear button is above the text field */
  }

  ${(props) =>
    props.context === "parameters" &&
    css`
      width: 100%;
      background-color: var(--secondary-color);
    `}
`;

export default CustomSearchWrapper;
