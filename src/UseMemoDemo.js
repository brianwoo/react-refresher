import { useEffect, useMemo, useState } from "react";

const UseMemoDemo = () => {

    const [dark, setDark] = useState(false);
    const [number, setNumber] = useState(0);

    // # useMemo benefit #1
    // Wrap around a slow function
    const doubleNum = useMemo(() => slowFunction(number), [number]);

    // # useMemo benefit #2
    const themeStyles = useMemo(() => {
        return {
            backgroundColor: dark ? 'black' : 'white',
            color: dark ? 'white' : 'black',
        };
    }, [dark]);

    // Because of referential equality, this useEffect will only 
    // exec if themeStyles has been changed
    useEffect(() => {
        console.log("theme changed");
    }, [themeStyles]);


    return (
        <>
            <div>{number}</div>
            <div style={themeStyles} onClick={() => setDark(!dark)}>theme is {dark ? 'dark' : 'light'}</div>
            <div>double the number: {doubleNum}</div>
            <div onClick={() => setNumber(number + 1)}>increment</div>
            <div onClick={() => setNumber(number - 1)}>decrement</div>

        </>
    );
}

const slowFunction = (num) => {
    console.log('Calling slow function');
    for (let i = 0; i <= 500000000; i++) { }
    return num * 2;
}


export default UseMemoDemo;