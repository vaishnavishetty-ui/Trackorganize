import {
  Search,
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useTasks } from "../context/TaskContext";

function Tasks() {
  const {
    tasks,
    toggleTask,
    deleteTask,
  } = useTasks();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");


  // Search + filter
  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(search.toLowerCase());


    const matchesFilter =
      filter === "All" ||
      (filter === "Pending" && !task.completed) ||
      (filter === "Completed" && task.completed);


    return matchesSearch && matchesFilter;
  });


  // Priority order
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };


  // Sort:
  // 1. Pending first
  // 2. High → Medium → Low
  // 3. Completed at bottom
  const sortedTasks = [...filteredTasks].sort((a, b) => {

    // Pending before completed
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Same completion status → priority
    return (
      (priorityOrder[a.priority] || 4) -
      (priorityOrder[b.priority] || 4)
    );
  });


  const handleDelete = (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      deleteTask(id);
    }
  };


  return (

    <div>

      {/* Heading */}
      <div className="page-heading">

        <div>

          <h1>
            Tasks
          </h1>

          <p>
            Manage and keep track of all your tasks.
          </p>

        </div>


        <Link
          to="/add-task"
          className="primary-button"
        >
          + Add Task
        </Link>

      </div>


      {/* Search + Filters */}
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
          className={`filter ${
            filter === "All"
              ? "active-filter"
              : ""
          }`}
          onClick={() => setFilter("All")}
        >
          All
        </button>


        <button
          className={`filter ${
            filter === "Pending"
              ? "active-filter"
              : ""
          }`}
          onClick={() => setFilter("Pending")}
        >
          Pending
        </button>


        <button
          className={`filter ${
            filter === "Completed"
              ? "active-filter"
              : ""
          }`}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>

      </div>


      {/* Task List */}
      <div className="tasks-panel">

        {sortedTasks.map((task) => (

          <div
            className="task-row"
            key={task.id}
          >

            {/* Checkbox */}
            <button
              type="button"
              className={`checkbox ${
                task.completed ? "checked" : ""
              }`}
              onClick={() => toggleTask(task.id)}
            >
              {task.completed && "✓"}
            </button>


            {/* Task information */}
            <div className="task-main">

              <Link to={`/tasks/${task.id}`}>

                <strong
                  style={{
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.title}
                </strong>

              </Link>

              <p>
                {task.description}
              </p>

            </div>


            {/* Priority */}
            <span
              className={`priority ${task.priority.toLowerCase()}`}
            >
              {task.priority}
            </span>


            {/* Date */}
            <span className="task-date">

              <CalendarDays size={15} />

              {task.dueDate || "No date"}

            </span>


            {/* Category */}
            <span className="category">

              {task.category || "General"}

            </span>


            {/* Actions */}
            <div className="row-actions">

              <button
                type="button"
                onClick={() =>
                  navigate(`/tasks/${task.id}`)
                }
                title="Edit task"
              >
                <Pencil size={16} />
              </button>


              <button
                type="button"
                className="delete"
                onClick={() =>
                  handleDelete(task.id)
                }
                title="Delete task"
              >
                <Trash2 size={16} />
              </button>

            </div>

          </div>

        ))}


        {sortedTasks.length === 0 && (

          <div
            style={{
              padding: "30px",
              textAlign: "center"
            }}
          >
            No tasks found.
          </div>

        )}

      </div>

    </div>
  );
}

export default Tasks;