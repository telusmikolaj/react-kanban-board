import React from "react";
import TasksContext from "../TasksContext";
import styled from "styled-components";
import Task from "./Task";

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
const Column = (props) => {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <TasksContext.Consumer>
        {(tasks) =>
          tasks.map((task) => {
            if (props.column.id === task.columnId) {
              return (
                <Task key={task.id} task={task} columnId={props.column.id} />
              );
            }
          })
        }
      </TasksContext.Consumer>
    </Container>
  );
};
export default Column;
