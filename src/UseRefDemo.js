import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const UseRefDemo = () => {
    const [name, setName] = useState('');

    // UseState won't work because setRenderCount causes a page re-render
    // A re-render will then trigger useEffect, which calls setRenderCount
    // Infinite loop problem.
    // const [renderCount, setRenderCount] = useState(0);
    // useEffect(() => {
    //     setRenderCount(prevRenderCount => prevRenderCount + 1);
    // });

    // Use Case #1. UseRef will not cause a page to re-render when 
    // value is updated.
    // When setName is called, this will NOT cause an infinite loop.
    const renderCount = useRef(1);
    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    });

    // Use Case #2. inputRef to reference a DOM object (input)
    const inputRef = useRef();
    const focus = () => {
        inputRef.current.focus();
    };

    return (
        <>
            <input ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
            <div>My name is {name}</div>
            <div>Rendered {renderCount.current} times</div>
            <div onClick={focus}>FOCUS on input</div>
        </>
    );
}

export default UseRefDemo;