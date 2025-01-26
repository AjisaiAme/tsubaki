import React, { useState } from "react";
import CustomSearchWrapper from "../styles/customSearchWrapper";

const SearchBar = ({ onSearch, placeholder = "Search...", context = "" }) => {
  const [query, setQuery] = useState("");

  // Handle search input change
  const handleChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  // Clear search input
  const handleClear = () => {
    setQuery("");
    onSearch(""); // Notify parent component when clearing the search query
  };

  return (
    <CustomSearchWrapper context={context}>
      <div className="search-input__control">
        <input
          type="text"
          className="search-input__text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
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

export default SearchBar;
