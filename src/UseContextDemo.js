import React from "react";
import { useState } from "react";
import ContextComponent from "./ContextComponent";

export const ThemeContext = React.createContext();

const UseContextDemo = () => {

    const [darkTheme, setDarkTheme] = useState(true);
    const toggleTheme = () => {
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    }

    return (
        <>
            <ThemeContext.Provider value={darkTheme}>
                <button onClick={toggleTheme}>Toggle Theme</button>
                <ContextComponent />
            </ThemeContext.Provider>
        </>
    );
}

export default UseContextDemo;