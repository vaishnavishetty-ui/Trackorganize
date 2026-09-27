import { useState, useEffect } from "react";
import { Search, Pencil, Trash2, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8081/api/todos";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const toggleTask = async (task) => {
    try {
      const res = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });
      if (res.ok) fetchTasks();
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    if (filter === "Pending") return matchesSearch && !t.completed;
    if (filter === "Completed") return matchesSearch && t.completed;
    return matchesSearch;
  });

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Tasks</h1>
          <p>Manage and keep track of all your tasks.</p>
        </div>
        <Link to="/add-task" className="primary-button">
          + Add Task
        </Link>
      </div>

      <div className="task-controls">
        <div className="search-box">
          <Search size={18} />
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className={`filter ${filter === "All" ? "active-filter" : ""}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`filter ${filter === "Pending" ? "active-filter" : ""}`}
          onClick={() => setFilter("Pending")}
        >
          Pending
        </button>
        <button
          className={`filter ${filter === "Completed" ? "active-filter" : ""}`}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </div>

      <div className="tasks-panel">
        {filteredTasks.map((task) => (
          <div className="task-row" key={task.id}>
            <div
              className={`checkbox ${task.completed ? "checked" : ""}`}
              onClick={() => toggleTask(task)}
              style={{ cursor: "pointer" }}
            >
              {task.completed && "✓"}
            </div>

            <div className="task-main">
              <Link to={`/tasks/${task.id}`}>
                <strong style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.title}
                </strong>
              </Link>
              <p>{task.description}</p>
            </div>

            <span className={`priority ${(task.priority || "low").toLowerCase()}`}>
              {task.priority || "Low"}
            </span>

            <span className="task-date">
              <CalendarDays size={15} />
              {task.dueDate || "No Due Date"}
            </span>

            <span className="category">{task.category || "General"}</span>

            <div className="row-actions">
              <Link to={`/tasks/${task.id}`}>
                <button><Pencil size={16} /></button>
              </Link>
              <button className="delete" onClick={() => deleteTask(task.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;