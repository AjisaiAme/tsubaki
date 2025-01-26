import React, { useRef } from "react";
import Select from "react-select";
import CustomDropdownWrapper from "../styles/customDropdownWrapper";

const CustomDropdown = ({ options, placeholder, onChange, value, context, onMenuClose, onBlur }) => {
  const selectRef = useRef(null);

  const handleChange = (selectedOption) => {
    onChange(selectedOption); // Call the parent-provided onChange handler
  };

  const handleMenuClose = () => {
    if (selectRef.current) {
      selectRef.current.blur(); // Blur the control element when the menu closes
    }
    onMenuClose && onMenuClose(); // Ensure onMenuClose is called
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(); // Call the passed blur function
    }
  };

  return (
    <CustomDropdownWrapper context={context}>
      <Select
        ref={selectRef}
        options={options}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        isSearchable={false}
        classNamePrefix="react-select"
        onMenuClose={handleMenuClose} // Triggered when the dropdown menu closes
        onBlur={handleBlur} // Triggered on blur event
      />
    </CustomDropdownWrapper>
  );
};

export default CustomDropdown;
