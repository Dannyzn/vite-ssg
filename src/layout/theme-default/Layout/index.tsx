import { useState } from "react";
import React = require("react");

export function Layout() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>This is Layout Component</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} >Increment</button> 
    </div>
    )
}
