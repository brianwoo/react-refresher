import { useCallback, useEffect, useState } from "react";

const UseCallbackDemo = () => {
    const [number, setNumber] = useState(1);
    const [dark, setDark] = useState(false);

    // getCalcFunc does not re-created if number is not changed.
    const getCalcFunc = useCallback((inc) => {
        return [number + inc + 1, number + inc + 3, number + inc + 5];
    }, [number]);

    const theme = {
        backgroundColor: dark ? '#333' : '#FFF',
        color: dark ? '#FFF' : '#333',
    }

    // useEffect does not exec if getCalcFunc does not change
    // Changing theme will not trigger useEffect
    useEffect(() => {
        console.log(getCalcFunc(2));
        console.log('useEffect executed');
    }, [getCalcFunc]);


    return (
        <>
            <div>{number}&nbsp;&nbsp;
                <button onClick={() => setNumber(number + 1)}>+</button>
            </div>
            <div style={theme} onClick={() => setDark(!dark)}>Theme</div>
        </>
    );
}

export default UseCallbackDemo;