import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or default to scheme1 light
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'scheme6';
  });

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('mode');
    return savedMode || 'light';
  });

  // Apply theme to html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);

    localStorage.setItem('theme', theme);
    localStorage.setItem('mode', mode);
  }, [theme, mode]);

  const availableThemes = ['scheme6', 'scheme1', 'scheme2', 'scheme3', 'scheme4', 'scheme5'];

  const toggleScheme = () => {
    setTheme(prevTheme => {
      const currentIndex = availableThemes.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % availableThemes.length;
      return availableThemes[nextIndex];
    });
  };

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleScheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};