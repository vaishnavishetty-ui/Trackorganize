import { useState, useEffect } from "react";
import { CheckCircle2, Clock3, ListTodo, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080/api/todos";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, progress: 0 });

  // Fetch tasks and statistics from Spring Boot API
  useEffect(() => {
    fetchTasks();
    fetchStats();
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

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const toggleTask = async (task) => {
    try {
      const res = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });
      if (res.ok) {
        fetchTasks();
        fetchStats(); // Update dashboard counts live
      }
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <h1>Good Morning, Tanuja! 👋</h1>
          <p>Stay focused. Get things done.</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <ListTodo size={19} />
          </div>
          <span>Total Tasks</span>
          <strong>{stats.total}</strong>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle2 size={19} />
          </div>
          <span>Completed</span>
          <strong>{stats.completed}</strong>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow">
            <Clock3 size={19} />
          </div>
          <span>Pending</span>
          <strong>{stats.pending}</strong>
        </div>

        <div className="stat-card progress-card">
          <span>Overall Progress</span>
          <strong>{stats.progress}%</strong>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${stats.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Today's Tasks</h2>
            <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>

          <div className="task-list">
            {tasks.map((task) => (
              <div className="dashboard-task" key={task.id}>
                <div
                  className={`checkbox ${task.completed ? "checked" : ""}`}
                  onClick={() => toggleTask(task)}
                  style={{ cursor: "pointer" }}
                >
                  {task.completed && "✓"}
                </div>

                <span className="task-title">{task.title}</span>

                <span className={`priority ${(task.priority || "low").toLowerCase()}`}>
                  {task.priority || "Low"}
                </span>

                <span className="task-time">{task.time || "12:00 PM"}</span>

                <Link to={`/tasks/${task.id}`}>
                  <ArrowRight size={17} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation Card */}
        <div className="motivation-card">
          <div className="motivation-icon">☑</div>
          <h3>Small steps</h3>
          <p>
            you take today
            <br />
            lead to big results
            <br />
            tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;