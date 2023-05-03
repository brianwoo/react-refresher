import { useDeferredValue, useEffect, useMemo, useState } from "react";

const LIST_SIZE = 20000;

const UseDeferredValueDemo = () => {
    const [input, setInput] = useState("");

    // This useMemo depends on input and it makes
    // the page very unresponsive.
    // const list = useMemo(() => {
    //     const l = [];
    //     for (let i = 0; i < LIST_SIZE; i++) {
    //         l.push(<div key={i}>{input}</div>);
    //     }
    //     return l;
    // }, [input]);

    // However, using useDeferredValue, React waits
    // until no more input, then update the list which
    // makes the UI a lot more responsive
    const deferredInput = useDeferredValue(input);
    const list = useMemo(() => {
        const l = [];
        for (let i = 0; i < LIST_SIZE; i++) {
            l.push(<div key={i}>{deferredInput}</div>);
        }
        return l;
    }, [deferredInput]);


    useEffect(() => {
        console.log(`input: ${input}, deferred: ${deferredInput}`);
    }, [input, deferredInput]);

    return (
        <>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            {list}
        </>
    );
}

export default UseDeferredValueDemo;