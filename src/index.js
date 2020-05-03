import React, { useState } from "react";
import ReactDOM from "react-dom";
import initialTasks from "./initialTasks";
import initialColumns from "./initialColumns";
const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  console.log(columns);
  return "Hello World";
};

ReactDOM.render(<App />, document.getElementById("root"));
