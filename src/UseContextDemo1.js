import React from "react";
import { ThemeProvider } from "./ThemeContext";
import ContextComponent1 from "./ContextComponent1";

export const ThemeContext = React.createContext();

const UseContextDemo1 = () => {

    return (
        <>
            <ThemeProvider>
                <ContextComponent1 />
            </ThemeProvider>
        </>
    );
}

export default UseContextDemo1;