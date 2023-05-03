import { useRef, useState } from "react";
import UseRefCustomComponent from "./UseRefCustomComponent";

const UseRefDemo1 = () => {
    const [value, setValue] = useState("");
    const inputRef = useRef();

    return (
        <>
            <UseRefCustomComponent
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={() => inputRef.current.focus()}>Focus</button>
        </>);
}

export default UseRefDemo1;