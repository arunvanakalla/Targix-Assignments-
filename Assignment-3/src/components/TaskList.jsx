import React, { useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { List, ListItem, ItemLeft, Actions, Tabs, Tab, Button, Input, Badge as BadgeStyled } from "../styles/Styled";

const NavTabsInline = ({ value, onChange }) => (
  <Tabs>
    <Tab $active={value === "ALL"} onClick={() => onChange("ALL")}>All</Tab>
    <Tab $active={value === "COMPLETED"} onClick={() => onChange("COMPLETED")}>Completed</Tab>
    <Tab $active={value === "PENDING"} onClick={() => onChange("PENDING")}>Pending</Tab>
  </Tabs>
);

const EmptyStateInline = ({ message = "No tasks found" }) => (
  <div style={{ padding: 12, opacity: 0.8 }}>{message}</div>
);

const TaskItemInline = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (!newTitle.trim()) { alert("Title cannot be empty!"); return; }
    onEdit(newTitle);
    setIsEditing(false);
  };

  return (
    <ListItem>
      {isEditing ? (
        <>
          <ItemLeft>
            <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          </ItemLeft>
          <Actions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Actions>
        </>
      ) : (
        <>
          <ItemLeft>
            <span>{task.title}</span>
            <BadgeStyled $completed={task.completed}>
              {task.completed ? "Completed" : "Pending"}
            </BadgeStyled>
          </ItemLeft>
          <Actions>
            <Button onClick={onToggle}>{task.completed ? "Mark Pending" : "Mark Completed"}</Button>
            <Button variant="danger" onClick={() => { if (window.confirm(`Delete "${task.title}"?`)) onDelete(); }}>Delete</Button>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          </Actions>
        </>
      )}
    </ListItem>
  );
};

const TaskList = () => {
  const { state, dispatch } = useGlobal();
  const [view, setView] = useState("ALL");

  const tasksToShow = state.tasks.filter((task) => {
    if (view === "COMPLETED") return task.completed;
    if (view === "PENDING") return !task.completed;
    return true;
  });

  return (
    <div>
      <NavTabsInline value={view} onChange={setView} />

      <List>
        {tasksToShow.length === 0 ? (
          <EmptyStateInline />
        ) : (
          tasksToShow.map((task) => (
            <TaskItemInline
              key={task.id}
              task={task}
              onToggle={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
              onDelete={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
              onEdit={(newTitle) => dispatch({ type: "EDIT_TASK", payload: { id: task.id, newTitle } })}
            />
          ))
        )}
      </List>
    </div>
  );
};

export default TaskList;
