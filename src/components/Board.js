import React from "react";
import ColumnsContext from "../ColumnsContext";
import Column from "./Column";

const Board = (props) => {
  return (
    <ColumnsContext.Consumer>
      {(columns) =>
        columns.map((column) => <Column key={columns.id} column={column} />)
      }
    </ColumnsContext.Consumer>
  );
};
export default Board;
