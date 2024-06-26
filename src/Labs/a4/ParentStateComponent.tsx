import React, { useState } from "react";
import ChildStateComponent from "./ChildStateComponent";

const ParentStateComponent = () => {
  const [counter, setCounter] = useState(123); // useState(integer)
  return (
    <div>
      <h2>parent state: </h2>
      <h2>Counter: {counter}</h2>
      <ChildStateComponent counter={counter} setCounter={setCounter} />
    </div>
  );
};
export default ParentStateComponent;
