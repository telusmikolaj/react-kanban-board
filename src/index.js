import React, { useState } from "react";
import ReactDOM from "react-dom";
import initialTasks from "./initialTasks";
import initialColumns from "./initialColumns";
import Board from "./components/Board";
import ColumnsContext from "./ColumnsContext";
import TasksContext from "./TasksContext";

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  console.log(columns);

  return (
    <ColumnsContext.Provider value={columns}>
      <TasksContext.Provider>
        <Board columns={columns} />
      </TasksContext.Provider>
    </ColumnsContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
