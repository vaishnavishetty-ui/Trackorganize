import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/todos";

function AddTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    category: ""
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, completed: false }),
      });

      if (res.ok) {
        navigate("/tasks");
      }
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Add Task</h1>
          <p>Fill in the details to create a new task.</p>
        </div>
      </div>

      <div className="form-panel">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Title <span>*</span></label>
            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter task description (optional)"
              value={task.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={task.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Category / Tag</label>
            <input
              type="text"
              name="category"
              placeholder="e.g. Development, Study, Personal"
              value={task.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/tasks")}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;