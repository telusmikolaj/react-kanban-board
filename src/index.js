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

const Container = styled.div`
  display: felx;
`;

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  const [editMode, setEditMode] = useState(false);
  // useEffect(() => {
  //   const currentTask = JSON.parse(localStorage.getItem("task"));
  //   const currentColumns = JSON.parse(localStorage.getItem("columns"));
  //   if (currentColumns != null || currentTask != null) {
  //     setTasks(currentTask);
  //     setColumns(currentColumns);
  //   }
  // }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);
  useEffect(() => {
    //localStorage.setItem("columns", JSON.stringify(columns));
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

  const getLastItemID = () => {
    const [lastItem] = [...tasks].slice(-1);

    return lastItem.id;
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    moveTask(draggableId, destination.droppableId);
    changeActiveTasksNum(source.droppableId, "-");

    changeActiveTasksNum(destination.droppableId, "+");
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

  const changeActiveTasksNum = (columnId, operator) => {
    let columnsCopy = [...columns];
    const columnIndex = columns.findIndex((column) => column.id === columnId);
    let updatedActiveTasks;
    if (operator === "+") {
      updatedActiveTasks = columnsCopy[columnIndex].activeTasks + 1;
    } else {
      updatedActiveTasks = columnsCopy[columnIndex].activeTasks - 1;
    }

    columnsCopy[columnIndex] = {
      ...columnsCopy[columnIndex],
      activeTasks: updatedActiveTasks,
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
