// ThemeContext.jsx
import React, { createContext, useContext } from "react";
import useTheme from "./useTheme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
