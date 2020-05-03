import React from "react";
import ColumnsContext from "../ColumnsContext";

const Board = (props) => {
  return (
    <ColumnsContext.Consumer>
      {(columns) => <div>{columns}</div>}
    </ColumnsContext.Consumer>
  );
};
export default Board;
