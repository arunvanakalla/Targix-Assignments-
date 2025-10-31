import React, { useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { Label, Input, Button } from "../styles/Styled";

export default function AddTaskForm() {
  const { dispatch } = useGlobal();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const add_task = () => {
    if (!id || !title) {
      alert("Please enter both ID and Title!");
      return;
    }

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Number(id),
        title: title,
        completed: false,
      },
    });

    setId("");
    setTitle("");
  };

  return (
    <div>
      <Label>
        ID:{" "}
        <Input
          type="text"
          placeholder="Enter task id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </Label>
      <Label>
        Title:{" "}
        <Input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Label>
      <Button onClick={add_task}>Add Task</Button>
    </div>
  );
}
