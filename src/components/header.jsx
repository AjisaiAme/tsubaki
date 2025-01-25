import React, { useState, useEffect } from 'react';
import '../styles/header.css';
import '../styles/theme.css';

import CustomDropdown from '../components/customDropdown.jsx'; // Adjust the path accordingly

// Themes object for easy mapping
const themes = {
    light: 'light',
    lightMia: 'light-mia',
    manga: 'manga',
    dark: 'dark',
    darkHerta: 'dark-herta',
    darkPhospho: 'dark-phospho'
};

const Header = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const [theme, setTheme] = useState(savedTheme);

    // Derive dark mode status from theme
    const isDarkMode = theme === 'dark' || theme === 'dark-herta' || theme === 'dark-phospho';

    useEffect(() => {
        // Apply the selected theme
        document.documentElement.setAttribute('data-theme', theme);

        // Store the selected theme in localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Handle theme change
    const handleThemeChange = (selectedOption) => {
        setTheme(selectedOption.value);
    };

    const toggleDarkMode = () => {
        const newTheme = isDarkMode ? 'light' : 'dark'; // Switch between light and dark-basic
        setTheme(newTheme);
    };

    // Dropdown options for react-select
    const themeOptions = [
        { value: themes.light, label: 'Light' },
        { value: themes.manga, label: 'Manga' },
        { value: themes.lightMia, label: 'Mia' },
        { value: themes.dark, label: 'Dark' },
        { value: themes.darkHerta, label: 'Herta' },
        { value: themes.darkPhospho, label: 'Phospho' },
    ];

    return (
        <header className="site-header">
            <nav>
                <ul>
                    <li>
                        <a href="/" className="animated-button">
                            <span>Home</span>
                            <span></span>
                        </a>
                    </li>
                    <li>
                        <a href="/about" className="animated-button">
                            <span>About</span>
                            <span></span>
                        </a>
                    </li>
                    <li>
                        <a href="/anilist" className="animated-button">
                            <span>AniList</span>
                            <span></span>
                        </a>
                    </li>
                    <li>
                        <a href="/lastfm" className="animated-button">
                            <span>last.fm</span>
                            <span></span>
                        </a>
                    </li>
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
                        <CustomDropdown
                            options={themeOptions}
                            value={theme}
                            onChange={handleThemeChange}
                        />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
