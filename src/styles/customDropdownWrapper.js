import styled, { css } from "styled-components";

const CustomDropdownWrapper = styled.div`
  width: 200px !important;

  z-index: 10 !important; /* Ensure it is above the glyph */

  /* Style for the control (dropdown button) */
  .react-select__control {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: var(--background-color) !important;
    border: 2px solid var(--primary-color) !important;
    color: var(--primary-color) !important;
    border-radius: 0px !important;
    padding: 5px 10px !important;
    box-shadow: none !important;
    transition: all 0.3s ease-in-out !important;
    height: 44px !important;
    margin: 0 !important;
    
    z-index: 20 !important; 

    /* Container for the selected value */
    .react-select__value-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100% !important;
    }

    /* Style for the selected value */
    .react-select__single-value {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      color: var(--primary-color) !important;
      transition: color 0.2s ease !important;
    }

    /* Style for the placeholder text */
    .react-select__placeholder {
      color: var(--primary-color) !important;
      transition: color 0.2s ease !important;
    }

    /* Hover state for the control */
    &:hover {
      box-shadow: 8px 8px 0px var(--primary-color) !important;
      transition: all 0.2s ease !important;
      color: var(--background-color) !important;
    }

    /* Focused or opened state for the control */
    &.react-select__control--is-focused,
    &.react-select__control--menu-is-open {
      box-shadow: 8px 8px 0px var(--primary-color) !important;
      background-color: var(--primary-color) !important;
      color: var(--background-color) !important;
      border: 2px solid var(--background-color) !important;
      
      .react-select__single-value,
      .react-select__placeholder {
        color: var(--background-color) !important;
      }
    }

    /* Specific styles for 'parameters' context */
    ${(props) =>
      props.context === "parameters" &&
      css`
        width: 250px !important;
        background-color: var(--secondary-color) !important;
      `}
  }

  /* Style for the menu (dropdown list) */
  .react-select__menu {
    background-color: var(--background-color) !important;
    border: none !important;
    border-radius: 0px !important;
    margin: 0 !important; 
    box-shadow: 8px 8px 0px var(--primary-color) !important;
    width: 100% !important;

    z-index: 30 !important; 
  }

  .react-select__menu-list {
    padding: 0 !important; 
  }

  /* Style for the options in the dropdown */
  .react-select__option {
    background-color: var(--background-color) !important;
    color: var(--primary-color) !important;
    padding: 10px !important;
    cursor: pointer !important;
    font-weight: normal !important;
    border-radius: 0px !important;
    transition: background-color 0.2s ease, color 0.2s ease !important;

    &:hover {
      background-color: rgba(var(--primary-color-rgb), 0.1) !important;
      color: var(--primary-color) !important;
    }

    &.react-select__option--is-selected {
      background-color: var(--primary-color) !important;
      color: var(--background-color) !important;
      font-weight: bold !important;
      border-bottom: 2px solid var(--background-color) !important;
      border-right: 2px solid var(--background-color) !important;
    }
  }

  .react-select__indicator,
  .react-select__indicator-separator {
    display: none !important;
  }
`;

export default CustomDropdownWrapper;
