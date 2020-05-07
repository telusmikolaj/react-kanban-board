import React, { useState } from "react";
import styled from "styled-components";
import { useInput } from "../hooks/input-hook";
import Task from "./Task";

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
  const { value, bind, reset } = useInput("");

  const createNewTask = (event) => {
    event.preventDefault();
    const newTask = {
      id: "",
      content: value,
      columnId: props.columnId,
    };
    props.addTask(newTask);
    reset();
  };

  const updateTask = (event) => {
    props.editTask(props.taskId, value);
  };

  return (
    <div>
      <form>
        <label htmlFor="Task"></label>
        <input type="text" placeholder={props.content} {...bind} />
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
