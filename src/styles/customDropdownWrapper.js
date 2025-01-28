import styled, { css } from "styled-components";

const CustomDropdownWrapper = styled.div`
  width: fit-content; /* Allow the width to adjust to the longest option */
  min-width: 10rem; /* Minimum width to ensure the button is not too small */
  z-index: 99; /* Ensure it is above the glyph */

  /* Style for the control (dropdown button) */
  .react-select__control {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color);
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    border-radius: 0;
    padding: 5px 10px;
    box-shadow: none;
    transition: all 0.3s ease-in-out;
    height: 44px;
    margin: 0;
    z-index: 20;
    width: 100%; /* Ensure the control takes the full width of the wrapper */

    /* Container for the selected value */
    .react-select__value-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      text-align: center; /* Ensure text is centered */
      padding: 0; /* Remove any default padding */
    }

    /* Style for the selected value */
    .react-select__single-value {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      color: var(--primary-color);
      transition: color 0.2s ease;
      white-space: nowrap; /* Prevent text from wrapping */
    }

    /* Style for the placeholder text */
    .react-select__placeholder {
      color: var(--primary-color);
      transition: color 0.2s ease;
      text-align: center; /* Ensure placeholder text is centered */
      white-space: nowrap; /* Prevent placeholder text from wrapping */
    }

    /* Hover state for the control */
    &:hover {
      box-shadow: 8px 8px 0px var(--primary-color);
      transition: all 0.2s ease;
      color: var(--background-color);
    }

    /* Focused or opened state for the control */
    &.react-select__control--is-focused,
    &.react-select__control--menu-is-open {
      box-shadow: 8px 8px 0px var(--primary-color);
      background-color: var(--primary-color);
      color: var(--background-color);
      border: 2px solid var(--background-color);

      .react-select__single-value,
      .react-select__placeholder {
        color: var(--background-color);
      }
    }

    /* Specific styles for 'parameters' context */
    ${(props) =>
      props.context === "parameters" &&
      css`
        width: 250px;
        background-color: var(--secondary-color);
      `}
  }

  /* Style for the menu (dropdown list) */
  .react-select__menu {
    background-color: var(--background-color);
    border: none;
    border-radius: 0;
    margin: 0;
    box-shadow: 8px 8px 0px var(--primary-color);
    width: 100%;
    z-index: 30;
    position: absolute; /* Ensure the menu is positioned correctly */
  }

  .react-select__menu-list {
    padding: 0;
  }

  /* Style for the options in the dropdown */
  .react-select__option {
    background-color: var(--background-color);
    color: var(--primary-color);
    padding: 10px;
    cursor: pointer;
    font-weight: normal;
    border-radius: 0;
    transition: background-color 0.2s ease, color 0.2s ease;
    white-space: nowrap; /* Prevent text from wrapping */

    &:hover {
      background-color: rgba(var(--primary-color-rgb), 0.1);
      color: var(--primary-color);
    }

    &.react-select__option--is-selected {
      background-color: var(--primary-color);
      color: var(--background-color);
      font-weight: bold;
      border-bottom: 2px solid var(--background-color);
      border-right: 2px solid var(--background-color);
    }
  }

  .react-select__indicator,
  .react-select__indicator-separator {
    display: none;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    width: 100%;

    .react-select__control {
      width: 100%;
    }
  }
`;

export default CustomDropdownWrapper;