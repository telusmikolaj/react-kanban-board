import React, { useState } from "react";

const Form = (props) => {
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      id: "",
      content,
      columnId: props.columnId,
    };
    props.addTask(newTask);
  };

  return (
    <div>
      <form>
        <label htmlFor="Task">Task</label>
        <input
          type="text"
          name="task"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Add task
        </button>
      </form>
    </div>
  );
};
export default Form;
