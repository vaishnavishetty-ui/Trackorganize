import {
  Search,
  Pencil,
  Trash2,
  CalendarDays
} from "lucide-react";

import { Link } from "react-router-dom";


const tasks = [
  {
    id: 1,
    title: "Finish React components",
    description: "Complete the UI for all pages",
    priority: "High",
    category: "Development"
  },
  {
    id: 2,
    title: "Study for DSA",
    description: "Revise arrays, strings and recursion",
    priority: "Medium",
    category: "Study"
  },
  {
    id: 3,
    title: "Update GitHub repository",
    description: "Push latest changes and update README",
    priority: "Low",
    category: "Git"
  },
  {
    id: 4,
    title: "Prepare for Jenkins setup",
    description: "Install Jenkins and configure pipeline",
    priority: "High",
    category: "DevOps"
  },
  {
    id: 5,
    title: "Read a chapter",
    description: "Read 1 chapter of the current book",
    priority: "Medium",
    category: "Personal"
  }
];


function Tasks() {

  return (
    <div>
      <div className="page-heading">
        <div>

          <h1>Tasks</h1>

          <p>
            Manage and keep track of all your tasks.
          </p>

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


        <button className="filter active-filter">
          All
        </button>

        <button className="filter">
          Pending
        </button>

        <button className="filter">
          Completed
        </button>


      </div>

      <div className="tasks-panel">

        {tasks.map((task) => (

          <div
            className="task-row"
            key={task.id}
          >

            <div className="checkbox"></div>


            <div className="task-main">
              <Link to={`/tasks/${task.id}`}>

                <strong>
                  {task.title}
                </strong>
              </Link>
              <p>{task.description}</p>
            </div>


            <span
              className={`priority ${task.priority.toLowerCase()}`}
            >
              {task.priority}
            </span>

            {/* Date */}
            <span className="task-date">
              <CalendarDays size={15} />

              Apr 27, 2025

            </span>


            <span className="category">
              {task.category}
            </span>


            {/* Actions */}
            <div className="row-actions">

              <button>
                <Pencil size={16} />
              </button>

              <button className="delete">
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