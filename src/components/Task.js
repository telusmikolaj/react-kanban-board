import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import DeleteContext from "../DeleteContext";

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  display: flex;
`;
const Button = styled.button`
  background: ${(props) => (props.edit ? "palevioletred" : "#FF5733")};
  margin-left: 10px;
  float: right;
  font-size: 0.7em;
  display: inline;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Task = (props) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.dragHandleProps}
        >
          <div>{props.task.content}</div>
          <Button edit>Edit</Button>
          <DeleteContext.Consumer>
            {(deleteTask) => (
              <Button onClick={() => deleteTask(props.task.id)}>Delete</Button>
            )}
          </DeleteContext.Consumer>
        </Container>
      )}
    </Draggable>
  );
};
export default Task;
