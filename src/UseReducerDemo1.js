import { useReducer, useState } from "react";

const UseReducerDemo1 = () => {

    const ACTIONS = {
        SUBMIT_COMMENT: 'submit-comment',
        DELETE_COMMENT: 'delete-comment',
        TOGGLE_DONE: 'toggle-done',
    };

    const getNewComment = (comment) => {
        return { id: Date.now(), text: comment, isCompleted: false };
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.SUBMIT_COMMENT:
                return [...state, getNewComment(action.payload)];
            case ACTIONS.DELETE_COMMENT:
                return state.filter((eachComment) => eachComment.id !== action.payload.id);
            case ACTIONS.TOGGLE_DONE:
                return state.map((eachComment) => {
                    if (eachComment.id === action.payload.id) {
                        return { ...eachComment, isCompleted: !eachComment.isCompleted };
                    }
                    return eachComment;
                });
            default:
                return state;
        }
    };

    // useReducer takes a reducer function and an initial value
    // it returns a state (page re-rendered when state updated),
    // and a dispatch function which takes an action object { type: 'xxx'}
    const [comments, dispatch] = useReducer(reducer, []);
    const [comment, setComment] = useState('');

    // console.log('comments: ', comments);

    const submitComment = (e) => {
        e.preventDefault();
        dispatch({ type: ACTIONS.SUBMIT_COMMENT, payload: comment });
        setComment('');
    };

    const deleteComment = (e, comment) => {
        e.preventDefault();
        dispatch({ type: ACTIONS.DELETE_COMMENT, payload: comment });
    };

    const toggleDone = (e, comment) => {
        e.preventDefault();
        dispatch({ type: ACTIONS.TOGGLE_DONE, payload: comment });
    };


    return (
        <>
            <form onSubmit={(e) => submitComment(e)}>
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
            </form>
            <br />
            {
                comments.map((eachComment) => {
                    return (
                        <div key={eachComment.id}>{eachComment.text}
                            <span>
                                &nbsp;
                                <button onClick={(e) => deleteComment(e, eachComment)}>delete</button>
                                <button onClick={(e) => toggleDone(e, eachComment)}>{eachComment.isCompleted ? 'Completed' : 'Pending'}</button>
                            </span>
                        </div>
                    );
                })
            }
        </>
    );
}

export default UseReducerDemo1;