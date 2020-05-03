import React, { useState } from "react";
import ReactDOM from "react-dom";
import initialTasks from "./initialTasks";
import initialColumns from "./initialColumns";
import Board from "./components/Board";
import ColumnsContext from "./ColumnsContext";
import TasksContext from "./TasksContext";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";

const Container = styled.div`
  display: felx;
`;
const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);

  const onDragStart = () => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color 0.2s ease";
  };
  const onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(tasks).length
      : 0;

    document.body.style.backgroundColor = `rgba(153,141,217,${opacity})`;
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskIndex = tasks.findIndex((task) => task.id === draggableId);
    let tasksCopy = [...tasks];
    tasksCopy[taskIndex] = {
      ...tasksCopy[taskIndex],
      columnId: destination.droppableId,
    };
    setTasks(tasksCopy);
    const startColumnIndex = columns.findIndex(
      (column) => column.id === source.droppableId
    );
    const finishColumnIndex = columns.findIndex(
      (column) => column.id === destination.droppableId
    );
    let columnsCopy = [...columns];

    const activeTasksFinishColumn =
      columnsCopy[finishColumnIndex].activeTasks + 1;
    columnsCopy[finishColumnIndex] = {
      ...columnsCopy[finishColumnIndex],
      activeTasks: activeTasksFinishColumn,
    };

    const activeTasksStartColumn =
      columnsCopy[startColumnIndex].activeTasks - 1;
    columnsCopy[startColumnIndex] = {
      ...columnsCopy[startColumnIndex],
      activeTasks: activeTasksStartColumn,
    };
    setColumns(columnsCopy);
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Container>
        <ColumnsContext.Provider value={columns}>
          <TasksContext.Provider value={tasks}>
            <Board />
          </TasksContext.Provider>
        </ColumnsContext.Provider>
      </Container>
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
