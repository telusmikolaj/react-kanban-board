import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import DeleteContext from "../DeleteContext";
import EditContext from "../EditContext";
import Form from "./Form";

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
  const [editMode, setEditMode] = useState(false);

  return editMode ? (
    <EditContext.Consumer>
      {(editTask) => (
        <Form
          mode={true}
          content={props.task.content}
          taskId={props.task.id}
          editTask={editTask}
        />
      )}
    </EditContext.Consumer>
  ) : (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.dragHandleProps}
        >
          {props.task.content}
          <Button onClick={() => setEditMode(true)} edit>
            Edit
          </Button>
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
