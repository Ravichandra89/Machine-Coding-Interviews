import { useContext, useState } from "react";
import { TaskContext } from "../reducer/TaskReducer";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "350px",
  margin: "60px auto",
  padding: "25px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const inputStyle = {
  padding: "12px",
  width: "300px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid gray",
};

const buttonStyle = {
  width: "320px",
  padding: "12px",
  background: "#0077ff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "15px",
};

export const AddTask = () => {
  const { dispatch } = useContext(TaskContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Task name is required!");
      return;
    }

    const newTask = {
      id: Date.now(),
      name,
      completed: false,
    };

    dispatch({ type: "ADD_TASK", payload: newTask });
    setName("");
    navigate("/"); // Go back to task list
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center" }}>Add New Task</h2>
      <form onSubmit={SubmitHandler}>
        <input
          type="text"
          placeholder="Enter task name"
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button type="submit" style={buttonStyle}>
          Add Task
        </button>
      </form>
    </div>
  );
};
