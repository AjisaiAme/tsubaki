// CustomDropdown.js
import React from "react";
import Select from "react-select";
import styled, { css } from "styled-components";

/**
 * Custom styled wrapper for the react-select component
 */
const CustomDropdownWrapper = styled.div`
  /* Style for the control (dropdown button) */
  .react-select__control {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: var(--background-color) !important; /* White background */
    border: 2px solid var(--primary-color) !important; /* Black border */
    color: var(--primary-color) !important; /* Black text */
    border-radius: 0px !important;
    padding: 5px 10px !important;
    box-shadow: none !important;
    transition: all 0.3s ease-in-out !important;
    width: 200px !important;
    height: 44px !important;

    /* Container for the selected value */
    .react-select__value-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    /* Style for the selected value */
    .react-select__single-value {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      color: var(--primary-color) !important; /* Black text for selected value */
      transition: color 0.2s ease !important;
    }

    /* Style for the placeholder text */
    .react-select__placeholder {
      color: var(--primary-color) !important; /* Black placeholder text */
      font-style: italic !important;
      transition: color 0.2s ease !important;
    }

    /* Hover state for the control */
    &:hover {
      box-shadow: 8px 8px 0px var(--primary-color) !important;
      transition: all 0.2s ease !important;
      color: var(--background-color) !important; /* Text turns white on hover */
    }

    /* Focused or opened state for the control */
    &.react-select__control--is-focused,
    &.react-select__control--menu-is-open {
      box-shadow: 8px 8px 0px var(--primary-color) !important;
      background-color: var(--primary-color) !important; /* Black background on focus/open */
      color: var(--background-color) !important; /* White text on focus/open */
      border: 2px solid var(--secondary-color) !important; /* White border */

      .react-select__single-value,
      .react-select__placeholder {
        color: var(--background-color) !important; /* White text when focused/active */
      }
    }

    /* Specific styles for 'parameters' context */
    ${(props) =>
      props.context === "parameters" &&
      css`
        width: 250px !important;
        background-color: var(--secondary-color) !important; /* White background in this context */
      `}
  }

  /* Style for the menu (dropdown list) */
  .react-select__menu {
    background-color: var(--background-color) !important; /* White background */
    border: none !important;
    border-radius: 0px !important;
    margin: 0 !important;
    box-shadow: 8px 8px 0px var(--primary-color) !important; /* Black shadow */
    width: 200px !important;
  }

  .react-select__menu-list {
    padding: 0 !important;
  }

  /* Style for the options in the dropdown */
  .react-select__option {
    background-color: var(--background-color) !important; /* White background for options */
    color: var(--primary-color) !important; /* Black text color */
    padding: 10px !important;
    cursor: pointer !important;
    font-weight: normal !important;
    border-radius: 0px !important;
    transition: background-color 0.2s ease, color 0.2s ease !important;

    /* Hover state for the options */
    &:hover {
      background-color: rgba(var(--primary-color-rgb), 0.1) !important; /* Light gray hover background */
      color: var(--primary-color) !important; /* White text on hover */
    }

    /* Selected state for the options */
    &.react-select__option--is-selected {
      background-color: var(--primary-color) !important; /* Black background when selected */
      color: var(--background-color) !important; /* White text for selected option */
      font-weight: bold !important;
    }
  }

  .react-select__indicator,
  .react-select__indicator-separator {
    display: none !important;
  }
`;

export default CustomDropdownWrapper;
