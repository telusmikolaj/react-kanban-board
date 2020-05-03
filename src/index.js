import React, { useState } from "react";
import ReactDOM from "react-dom";
const App = () => {
  const [task, setTask] = useState(initialTasks);
  return "Hello World";
};

ReactDOM.render(<App />, document.getElementById("root"));
