import React from "react";
import ColumnsContext from "../ColumnsContext";
import Column from "./Column";

const Board = (props) => {
  return (
    <ColumnsContext.Consumer>
      {(columns) =>
        columns.map((column) => (
          <Column key={column.id} column={column} addTask={props.addTask} />
        ))
      }
    </ColumnsContext.Consumer>
  );
};
export default Board;
