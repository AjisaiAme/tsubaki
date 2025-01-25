import React from "react";
import Select from "react-select";
import CustomDropdownWrapper from "../styles/customDropdownWrapper";

const CustomDropdown = ({ options, placeholder, onChange, value, context }) => {
  return (
    <CustomDropdownWrapper context={context}>
      <Select
        options={options}
        placeholder={placeholder}
        onChange={(selectedOption) => onChange(selectedOption)}
        value={options.find(option => option.value === value)}
        isSearchable={false}
        classNamePrefix="react-select"
      />
    </CustomDropdownWrapper>
  );
};

export default CustomDropdown;
