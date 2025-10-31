import React from "react";
import { useGlobal } from "../context/GlobalContext";
import { ProgressBarTrack, ProgressBarFill } from "../styles/Styled";

const Meta = ({ label, value }) => (
  <span style={{ marginRight: 12 }}>
    <strong>{label}: </strong>{value}
  </span>
);

const TaskSummary = () => {
  const { state } = useGlobal();
  const total = state.tasks.length;
  const completed = state.tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Meta label="Total" value={total} />
        <Meta label="Completed" value={completed} />
        <Meta label="Pending" value={pending} />
      </div>
      <ProgressBarTrack>
        <ProgressBarFill $percent={percent} />
      </ProgressBarTrack>
      <div style={{ fontSize: 12, marginTop: 6 }}>{percent}% completed</div>
    </div>
  );
};

export default TaskSummary;