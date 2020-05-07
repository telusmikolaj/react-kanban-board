import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import initialTasks from "./initialTasks";
import initialColumns from "./initialColumns";
import Board from "./components/Board";
import ColumnsContext from "./ColumnsContext";
import TasksContext from "./TasksContext";
import DeleteContext from "./DeleteContext";
import EditContext from "./EditContext";

import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { useLocalStorage } from "./hooks/localstorage-hook";

const Container = styled.div`
  display: felx;
`;

const App = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", initialTasks);
  const [columns, setColumns] = useLocalStorage("columns", initialColumns);

  useEffect(() => {
    console.log(columns);
  }, [columns]);
  const onDragStart = () => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color 0.2s ease";
  };
  const onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(tasks).length
      : 0;
  };

  const deleteTask = (taskId) => {
    const [clearedTask] = tasks.filter((task) => task.id === taskId);
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    changeActiveTasksNum(clearedTask.columnId, "-");
  };

  const editTask = (taskId, content) => {
    let tasksCopy = [...tasks];
    const taskIndex = tasksCopy.findIndex((task) => task.id === taskId);
    console.log(taskIndex);
    tasksCopy[taskIndex].content = content;
    setTasks(tasksCopy);
  };
  const addTask = (data) => {
    const [lastItem] = [...tasks].slice(-1);
    const lastItemId = parseInt(lastItem.id);
    data.id = (lastItemId + 1).toString();
    let tasksCopy = [...tasks];
    tasksCopy.push(data);
    changeActiveTasksNum(data.columnId, "+");
    console.log(data.columnId);
    setTasks(tasksCopy);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    moveTask(draggableId, destination.droppableId);
    changeActiveTasksNum(destination.droppableId, source.droppableId);
  };

  const moveTask = (taskId, columnId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    let tasksCopy = [...tasks];

    tasksCopy[taskIndex] = {
      ...tasksCopy[taskIndex],
      columnId: columnId,
    };
    setTasks(tasksCopy);
  };

  const changeActiveTasksNum = (endColumnId, startColumnId) => {
    console.log(endColumnId);
    console.log(startColumnId);
    let columnsCopy = [...columns];

    const startColumnIndex = columns.findIndex(
      (column) => column.id === startColumnId
    );
    console.log(startColumnIndex);
    const endColumnIndex = columns.findIndex(
      (column) => column.id === endColumnId
    );

    const startActiveTasks = columnsCopy[startColumnIndex].activeTasks - 1;
    columnsCopy[startColumnIndex] = {
      ...columnsCopy[startColumnIndex],
      activeTasks: startActiveTasks,
    };
    const endActiveTasks = columnsCopy[endColumnIndex].activeTasks + 1;
    columnsCopy[endColumnIndex] = {
      ...columnsCopy[endColumnIndex],
      activeTasks: endActiveTasks,
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
            <DeleteContext.Provider value={deleteTask}>
              <EditContext.Provider value={editTask}>
                <Board addTask={addTask} />
              </EditContext.Provider>
            </DeleteContext.Provider>
          </TasksContext.Provider>
        </ColumnsContext.Provider>
      </Container>
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
