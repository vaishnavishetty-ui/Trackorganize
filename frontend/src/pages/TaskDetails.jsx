import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  Pencil,
  Trash2,
} from "lucide-react";

import { useState } from "react";

import { useTasks } from "../context/TaskContext";


function TaskDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    tasks,
    toggleTask,
    deleteTask,
    updateTask,
  } = useTasks();


  const task = tasks.find(
    (item) => item.id === Number(id)
  );


  const [editing, setEditing] = useState(false);


  const [editData, setEditData] = useState(null);


  if (!task) {

    return (

      <div>

        <h1>Task Not Found</h1>

        <Link to="/tasks">
          ← Back to Tasks
        </Link>

      </div>

    );

  }


  const startEditing = () => {

    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category,
    });

    setEditing(true);

  };


  const handleEditChange = (e) => {

    setEditData({

      ...editData,

      [e.target.name]: e.target.value

    });

  };


  const saveEdit = () => {

    updateTask(task.id, editData);

    setEditing(false);

  };


  const handleDelete = () => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );


    if (confirmed) {

      deleteTask(task.id);

      navigate("/tasks");

    }

  };


  return (

    <div>

      {/* Heading */}
      <div className="page-heading">

        <div>

          <h1>
            Task Details
          </h1>

          <Link
            to="/tasks"
            className="back-link"
          >
            ← Back to Tasks
          </Link>

        </div>

      </div>


      {/* Task Information */}
      <div className="details-panel">


        <div className="details-top">


          <div className="details-title">

            <button
              type="button"
              className={`checkbox ${
                task.completed ? "checked" : ""
              }`}
              onClick={() =>
                toggleTask(task.id)
              }
            >
              {task.completed && "✓"}
            </button>


            <div>

              {editing ? (

                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    padding: "8px",
                    width: "100%",
                  }}
                />

              ) : (

                <h2>
                  {task.title}
                </h2>

              )}


              {editing ? (

                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    minHeight: "80px",
                  }}
                />

              ) : (

                <p>
                  {task.description}
                </p>

              )}

            </div>

          </div>


          {/* Buttons */}
          <div className="details-actions">

            {!editing ? (

              <button
                className="edit-button"
                onClick={startEditing}
              >

                <Pencil size={16} />

                Edit

              </button>

            ) : (

              <button
                className="edit-button"
                onClick={saveEdit}
              >

                Save

              </button>

            )}


            <button
              className="complete-button"
              onClick={() =>
                toggleTask(task.id)
              }
            >

              <CheckCircle2 size={16} />

              {task.completed
                ? "Mark Pending"
                : "Mark Completed"}

            </button>


            <button
              className="delete-button"
              onClick={handleDelete}
            >

              <Trash2 size={16} />

              Delete

            </button>

          </div>


        </div>


        {/* Information */}
        <div className="details-info">


          <div>

            <span>
              Priority
            </span>

            {editing ? (

              <select
                name="priority"
                value={editData.priority}
                onChange={handleEditChange}
              >

                <option>Low</option>
                <option>Medium</option>
                <option>High</option>

              </select>

            ) : (

              <strong
                className={`priority ${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </strong>

            )}

          </div>


          <div>

            <span>
              Due Date
            </span>

            {editing ? (

              <input
                type="date"
                name="dueDate"
                value={editData.dueDate}
                onChange={handleEditChange}
              />

            ) : (

              <strong>

                <CalendarDays size={15} />

                {task.dueDate || "No date"}

              </strong>

            )}

          </div>


          <div>

            <span>
              Category
            </span>

            {editing ? (

              <input
                type="text"
                name="category"
                value={editData.category}
                onChange={handleEditChange}
              />

            ) : (

              <strong className="category">
                {task.category || "General"}
              </strong>

            )}

          </div>


          <div>

            <span>
              Created At
            </span>

            <strong>

              <Clock3 size={15} />

              Today

            </strong>

          </div>


          <div>

            <span>
              Status
            </span>

            <strong
              className={`status ${
                task.completed
                  ? "completed"
                  : "pending"
              }`}
            >

              ●{" "}

              {task.completed
                ? "Completed"
                : "Pending"}

            </strong>

          </div>


        </div>


      </div>


      {/* Activity */}
      <div className="activity-panel">

        <h2>
          Activity / History
        </h2>


        <div className="activity-item">

          <div className="activity-dot"></div>

          <div>

            <strong>
              Task created
            </strong>

            <p>
              Task is available in Track&Organize.
            </p>

          </div>

        </div>


        <div className="activity-item">

          <div className="activity-dot gray"></div>

          <div>

            <strong>
              Current status
            </strong>

            <p>
              {task.completed
                ? "Completed"
                : "Pending"}
            </p>

          </div>

        </div>

      </div>


    </div>
  );
}


export default TaskDetails;