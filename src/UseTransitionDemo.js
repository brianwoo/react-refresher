import { useState, useTransition } from "react";

const UseTransitionDemo = () => {
    const [isPending, startTransition] = useTransition();
    const [input, setInput] = useState("");
    const [list, setList] = useState([]);


    const LIST_SIZE = 20000;

    // By default, React re-renders page when both setInput()
    // and setList() are done. However, setList() is a SLOW
    // function
    // We use setTransition() to turn setList() into a low
    // priority operation. setInput() re-renders the page
    // right away, but setList() re-renders later when its done.
    const handleChange = (e) => {
        setInput(e.target.value);

        // low priority, re-renders separately when it's done
        startTransition(() => {
            const l = [];
            for (let i = 0; i < LIST_SIZE; i++) {
                l.push(e.target.value);
            }
            setList(l);
        });
    };


    return (
        <>
            <input type="text" value={input} onChange={handleChange} />
            {
                isPending ? "Loading..." :
                    list.map((item, i) => {
                        return <div key={i}>{item}</div>
                    })
            }
        </>
    );
}

export default UseTransitionDemo;