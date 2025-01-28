import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CustomDropdownWrapper from '../styles/customDropdownWrapper';

const CustomDropdown = ({ options, placeholder, onChange, value, context, onMenuClose, onBlur }) => {
  const selectRef = useRef(null);

  // Handle option selection
  const handleChange = useCallback(
    (selectedOption) => {
      onChange(selectedOption);
    },
    [onChange]
  );

  // Handle menu close event
  const handleMenuClose = useCallback(() => {
    if (selectRef.current) {
      selectRef.current.blur(); // Blur the dropdown on close
    }
    onMenuClose?.(); // Call optional onMenuClose callback
  }, [onMenuClose]);

  // Handle blur event
  const handleBlur = useCallback(() => {
    onBlur?.(); // Call optional onBlur callback
  }, [onBlur]);

  // Determine the placeholder text
  const activePlaceholder = value?.label || placeholder;

  return (
    <CustomDropdownWrapper context={context}>
      <Select
        ref={selectRef}
        options={options}
        placeholder={activePlaceholder}
        onChange={handleChange}
        value={value || null} // Fallback to null if value is undefined
        isSearchable={false}
        classNamePrefix="react-select"
        onMenuClose={handleMenuClose}
        onBlur={handleBlur}
        aria-label={activePlaceholder || 'Dropdown'} // Improve accessibility
      />
    </CustomDropdownWrapper>
  );
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
  context: PropTypes.string,
  onMenuClose: PropTypes.func,
  onBlur: PropTypes.func,
};

CustomDropdown.defaultProps = {
  placeholder: 'Select an option',
  value: null,
  context: '',
  onMenuClose: () => {},
  onBlur: () => {},
};

export default CustomDropdown;