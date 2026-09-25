import {
  CheckCircle2,
  Clock3,
  ListTodo,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function Dashboard() {
  const { tasks, toggleTask } = useTasks();

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const totalTasks = tasks.length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div>

      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <h1>Good Morning, Tanuja! 👋</h1>

          <p>
            Stay focused. Get things done.
          </p>
        </div>
      </div>


      {/* Statistics */}
      <div className="stats-grid">

        {/* Total */}
        <div className="stat-card">

          <div className="stat-icon blue">
            <ListTodo size={19} />
          </div>

          <span>Total Tasks</span>

          <strong>{totalTasks}</strong>

        </div>


        {/* Completed */}
        <div className="stat-card">

          <div className="stat-icon green">
            <CheckCircle2 size={19} />
          </div>

          <span>Completed</span>

          <strong>{completedTasks}</strong>

        </div>


        {/* Pending */}
        <div className="stat-card">

          <div className="stat-icon yellow">
            <Clock3 size={19} />
          </div>

          <span>Pending</span>

          <strong>{pendingTasks}</strong>

        </div>


        {/* Progress */}
        <div className="stat-card progress-card">

          <span>Overall Progress</span>

          <strong>{progress}%</strong>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>

          </div>

        </div>

      </div>


      {/* Today's Tasks */}
      <div className="dashboard-grid">

        <div className="panel">

          <div className="panel-header">

            <h2>
              Today's Tasks
            </h2>

            <span>
              Apr 27, 2025
            </span>

          </div>


          <div className="task-list">

            {tasks.map((task) => (

              <div
                className="dashboard-task"
                key={task.id}
              >

                {/* Checkbox */}
                <button
                  className={`checkbox ${
                    task.completed ? "checked" : ""
                  }`}
                  onClick={() => toggleTask(task.id)}
                  aria-label="Toggle task"
                >
                  {task.completed && "✓"}
                </button>


                {/* Task title */}
                <Link
                  to={`/tasks/${task.id}`}
                  className="task-title"
                >
                  {task.title}
                </Link>


                {/* Priority */}
                <span
                  className={`priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>


                {/* Time */}
                <span className="task-time">
                  {task.dueDate || "Today"}
                </span>


                {/* Details */}
                <Link to={`/tasks/${task.id}`}>
                  <ArrowRight size={17} />
                </Link>

              </div>

            ))}

          </div>

        </div>


        {/* Motivation */}
        <div className="motivation-card">

          <div className="motivation-icon">
            ☑
          </div>

          <h3>
            Small steps
          </h3>

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