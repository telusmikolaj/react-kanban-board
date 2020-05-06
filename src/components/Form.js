import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => (props.edit ? "palevioletred" : "#FF5733")};
  margin-left: 10px;
  float: right;
  font-size: 0.7em;
  display: inline;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const Form = (props) => {
  const [content, setContent] = useState("");

  const createNewTask = (event) => {
    event.preventDefault();
    const newTask = {
      id: "",
      content,
      columnId: props.columnId,
    };
    props.addTask(newTask);
  };

  const updateTask = (event) => {
    event.preventDefault();
    props.editTask(props.taskId, content);
  };

  return (
    <div>
      <form>
        <label htmlFor="Task"></label>
        <input
          type="text"
          name="task"
          placeholder={props.content}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {props.mode ? (
          <Button type="submit" onClick={updateTask}>
            Update
          </Button>
        ) : (
          <Button type="submit" onClick={createNewTask}>
            Add
          </Button>
        )}
      </form>
    </div>
  );
};
export default Form;
