import React from 'react';
import { render } from "react-dom";
import { FormField } from "./lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h1>React FormField</h1>
    <FormField />
  </div>
);

render(<App />, document.getElementById("root"));

