import { useReducer } from "react";

const UseReducerDemo = () => {

    const ACTIONS = {
        INCREMENT: 'increment',
        DECREMENT: 'decrement'
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.DECREMENT:
                return { count: state.count - 1 };
            case ACTIONS.INCREMENT:
                return { count: state.count + 1 };
            default:
                return state;
        }
    };

    // useReducer takes a reducer function and an initial value
    // it returns a state (page re-rendered when state updated),
    // and a dispatch function which takes an action object { type: 'xxx'}
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    const increment = () => {
        dispatch({ type: ACTIONS.INCREMENT });
    };

    const decrement = () => {
        dispatch({ type: ACTIONS.DECREMENT });
    };

    return (
        <>
            <button onClick={decrement}>-</button>
            <span>{state.count}</span>
            <button onClick={increment}>+</button>
        </>
    );
}

export default UseReducerDemo;