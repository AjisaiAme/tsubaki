// DarkLightToggle.jsx
import React from "react";
import { useThemeContext } from "../../../context/themeContext";

const DarkLightToggle = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="toggle-container">
      <input
        id="dark-mode-toggle"
        type="checkbox"
        className="toggle-checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label
        htmlFor="dark-mode-toggle"
        className="toggle-label"
        role="switch"
        aria-checked={theme === "dark"}
      >
        <span className="toggle-switch"></span>
      </label>
    </div>
  );
};

export default DarkLightToggle;
