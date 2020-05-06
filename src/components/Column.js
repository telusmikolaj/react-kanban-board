import React from "react";
import TasksContext from "../TasksContext";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import Form from "./Form";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  flex-gorw: 1;
  min-height: 100px;
`;

const Button = styled.button`
  display: inline-block;
  width: 19px;
  height: 18px;
  text-align: center;
  background-color: #d2d2d2;
  border-radius: 50%;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
`;
const Column = (props) => {
  const isDropDisabled = props.column.taskLimit === props.column.activeTasks;
  return (
    <Container>
      <Title>
        {props.column.title}
        {isDropDisabled && <span> Limit reached</span>}
      </Title>
      <Droppable droppableId={props.column.id} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <TasksContext.Consumer>
              {(tasks) =>
                tasks.map((task) => {
                  if (props.column.id === task.columnId) {
                    return (
                      <Task
                        key={task.id}
                        task={task}
                        columnId={props.column.id}
                        index={task.id}
                      />
                    );
                  }
                })
              }
            </TasksContext.Consumer>
          </TaskList>
        )}
      </Droppable>

      {!isDropDisabled && (
        <Form columnId={props.column.id} addTask={props.addTask} />
      )}
    </Container>
  );
};
export default Column;
