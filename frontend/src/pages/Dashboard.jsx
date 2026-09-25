import {
  CheckCircle2,
  Clock3,
  ListTodo,
  ArrowRight
} from "lucide-react";

import { Link } from "react-router-dom";


const todayTasks = [
  {
    id: 1,
    title: "Finish React components",
    priority: "High",
    time: "10:00 AM",
    completed: false
  },
  {
    id: 2,
    title: "Study for DSA",
    priority: "Medium",
    time: "2:00 PM",
    completed: false
  },
  {
    id: 3,
    title: "Update GitHub repository",
    priority: "Low",
    time: "5:00 PM",
    completed: true
  },
  {
    id: 4,
    title: "Prepare for Jenkins setup",
    priority: "High",
    time: "7:00 PM",
    completed: false
  },
  {
    id: 5,
    title: "Read a chapter",
    priority: "Medium",
    time: "9:00 PM",
    completed: false
  }
];


function Dashboard() {

  return (

    <div>

      {/* Page Heading */}
      <div className="page-heading">

        <div>

          <h1>
            Good Morning, Tanuja! 👋
          </h1>

          <p>
            Stay focused. Get things done.
          </p>

        </div>

      </div>


      {/* Statistics */}
      <div className="stats-grid">


        <div className="stat-card">

          <div className="stat-icon blue">
            <ListTodo size={19} />
          </div>

          <span>Total Tasks</span>

          <strong>8</strong>

        </div>


        <div className="stat-card">

          <div className="stat-icon green">
            <CheckCircle2 size={19} />
          </div>

          <span>Completed</span>

          <strong>3</strong>

        </div>


        <div className="stat-card">

          <div className="stat-icon yellow">
            <Clock3 size={19} />
          </div>

          <span>Pending</span>

          <strong>5</strong>

        </div>


        <div className="stat-card progress-card">

          <span>Overall Progress</span>

          <strong>38%</strong>

          <div className="progress-bar">

            <div className="progress-fill"></div>

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

            {todayTasks.map((task) => (

              <div
                className="dashboard-task"
                key={task.id}
              >

                <div
                  className={`checkbox ${
                    task.completed ? "checked" : ""
                  }`}
                >
                  {task.completed && "✓"}
                </div>


                <span className="task-title">
                  {task.title}
                </span>


                <span
                  className={`priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>


                <span className="task-time">
                  {task.time}
                </span>


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