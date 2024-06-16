import React from "react";
import ContextComponent1 from "./ContextComponent2";


const UseContextDemo2 = () => {

  const {
    userId,
    userName,
    languageRegion,
    clientId,
    setClientId,
  } = useSessionInfoContext();

    return (
        <>
            <div>{userId}</div>
            <div>{userName}</div>
            <div>{languageRegion}</div>
            <div>{clientId}</div>
        </>
    );
}

export default UseContextDemo1;
