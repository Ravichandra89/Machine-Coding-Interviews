import { useContext } from "react";
import { TaskContext } from "../reducer/TaskReducer";

export const TaskCard = ({ task }) => {
  const { dispatch } = useContext(TaskContext);

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "12px",
        borderRadius: "10px",
        width: "380px",
        marginBottom: "10px",
      }}
    >
      <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.name}
      </h3>

      <button
        onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
        style={{ marginRight: "10px" }}
      >
        ✅ {task.completed ? "Undo" : "Complete"}
      </button>

      <button onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}>
        🗑 Delete
      </button>
    </div>
  );
};
