import React, { useState, useEffect } from 'react';
import '../styles/header.css';
import '../styles/theme.css';

const themes = {
    light: 'light',
    lightMia: 'light-mia',
    dark: 'dark',
    darkHerta: 'dark-herta',
};

const Header = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const [theme, setTheme] = useState(savedTheme);
    
    // Derive dark mode status from theme
    const isDarkMode = theme === 'dark' || theme === 'dark-herta';

    useEffect(() => {
        // Apply the selected theme
        document.documentElement.setAttribute('data-theme', theme);

        // Store the selected theme in localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    const toggleDarkMode = () => {
        const newTheme = isDarkMode ? 'light' : 'dark'; // Switch between light and dark-basic
        setTheme(newTheme);
        setIsDarkMode(!isDarkMode);
    };

    return (
        <header className="site-header">
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/anilist">AniList</a></li>
                    <li><a href="/lastfm">last.fm</a></li>
                    <li>
                        <div className="toggle-container">
                            <input 
                                type="checkbox" 
                                id="dark-mode-toggle" 
                                className="toggle-checkbox" 
                                checked={isDarkMode} 
                                onChange={toggleDarkMode}
                            />
                            <label htmlFor="dark-mode-toggle" className="toggle-label">
                                <span className="toggle-switch"></span>
                            </label>
                        </div>
                    </li>
                    <li>
                        <select value={theme} onChange={handleThemeChange}>
                            <option value={themes.light}>Light</option>
                            <option value={themes.lightMia}>Mia</option>
                            <option disabled>──────────</option> {/* Separator */}
                            <option value={themes.dark}>Dark</option>
                            <option value={themes.darkHerta}>Herta</option>
                        </select>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
