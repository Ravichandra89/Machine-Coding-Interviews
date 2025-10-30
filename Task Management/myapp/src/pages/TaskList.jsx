import { useContext, useState } from "react";
import { TaskContext } from "../reducer/TaskReducer";
import { TaskCard } from "../component/TaskCard";
import { Link } from "react-router-dom";

export const TaskList = () => {
  const { state } = useContext(TaskContext);
  const [filter, setFilter] = useState("all");

  const filteredTasks = state.tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div style={mainContainer}>
      {/* Header with Add Task Button */}
      <div style={header}>
        <h2 style={{ margin: 0 }}>Task Manager</h2>
        <Link to="/add-task">
          <button style={addButton}>+ Add Task</button>
        </Link>
      </div>

      {/* Filter Buttons */}
      <div style={filterContainer}>
        <button
          style={filterBtn(filter === "all")}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          style={filterBtn(filter === "completed")}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          style={filterBtn(filter === "pending")}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {/* Task Cards */}
      <div style={taskContainer}>
        {filteredTasks.length === 0 ? (
          <p>No Tasks Found...</p>
        ) : (
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

/* ---------------- CSS ---------------- */

const mainContainer = {
  width: "80%",
  margin: "auto",
  paddingTop: "30px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const addButton = {
  padding: "10px 18px",
  background: "#0077ff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const filterContainer = {
  display: "flex",
  gap: "10px",
  marginTop: "20px",
};

const filterBtn = (active) => ({
  padding: "8px 14px",
  borderRadius: "4px",
  border: active ? "2px solid #0077ff" : "1px solid gray",
  cursor: "pointer",
  background: active ? "#e6f2ff" : "#fff",
});

const taskContainer = {
  marginTop: "30px",
};
