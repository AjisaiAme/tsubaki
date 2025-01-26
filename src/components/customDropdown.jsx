import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CustomDropdownWrapper from '../styles/customDropdownWrapper';

const CustomDropdown = ({ options, placeholder, onChange, value, context, onMenuClose, onBlur }) => {
  const selectRef = useRef(null);

  const handleChange = (selectedOption) => {
    onChange(selectedOption);
  };

  const handleMenuClose = () => {
    if (selectRef.current) selectRef.current.blur();
    onMenuClose?.();
  };

  const handleBlur = () => {
    onBlur?.();
  };

  const activePlaceholder = value ? value.label : placeholder;

  return (
    <CustomDropdownWrapper context={context}>
      <Select
        ref={selectRef}
        options={options}
        placeholder={activePlaceholder}
        onChange={handleChange}
        value={value}
        isSearchable={false}
        classNamePrefix="react-select"
        onMenuClose={handleMenuClose}
        onBlur={handleBlur}
        aria-label="Dropdown"
      />
    </CustomDropdownWrapper>
  );
};

CustomDropdown.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object, // Ensure value is an object
  context: PropTypes.string,
  onMenuClose: PropTypes.func,
  onBlur: PropTypes.func,
};

export default CustomDropdown;