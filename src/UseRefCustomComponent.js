import React from "react";

const UseRefCustomComponent = ({ ...props }, ref) => {
    return (
        <input
            {...props}
            ref={ref}
            type="text"
        />
    );
}

export default React.forwardRef(UseRefCustomComponent);