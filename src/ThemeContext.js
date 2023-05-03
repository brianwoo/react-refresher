import React, { useContext, useState } from "react";

export const ThemeContext1 = React.createContext();
export const ThemeUpdateContext = React.createContext();

export function useTheme() {
    return useContext(ThemeContext1);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
    const [darkTheme, setDarkTheme] = useState(true);
    const toggleTheme = () => {
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    }

    return (
        <ThemeContext1.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext1.Provider>
    );

}