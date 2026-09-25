import { Link, useParams } from "react-router-dom";

import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  Pencil,
  Trash2
} from "lucide-react";


function TaskDetails() {

  const { id } = useParams();


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

            <div className="checkbox"></div>


            <div>

              <h2>
                Finish React components
              </h2>

              <p>
                Complete the UI for all pages including
                navigation, responsive design and basic styling.
              </p>

            </div>

          </div>


          {/* Buttons */}
          <div className="details-actions">

            <button className="edit-button">

              <Pencil size={16} />

              Edit

            </button>


            <button className="complete-button">

              <CheckCircle2 size={16} />

              Mark Completed

            </button>


            <button className="delete-button">

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

            <strong className="priority high">
              High
            </strong>

          </div>


          <div>

            <span>
              Due Date
            </span>

            <strong>

              <CalendarDays size={15} />

              Apr 27, 2025 10:00 AM

            </strong>

          </div>


          <div>

            <span>
              Category
            </span>

            <strong className="category">
              Development
            </strong>

          </div>


          <div>

            <span>
              Created At
            </span>

            <strong>

              <Clock3 size={15} />

              Apr 26, 2025 06:45 PM

            </strong>

          </div>


          <div>

            <span>
              Status
            </span>

            <strong className="status pending">
              ● Pending
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
              Apr 26, 2025 06:45 PM
            </p>

          </div>

        </div>


        <div className="activity-item">

          <div className="activity-dot gray"></div>

          <div>

            <strong>
              Status updated to Pending
            </strong>

            <p>
              Apr 26, 2025 06:45 PM
            </p>

          </div>

        </div>


      </div>


    </div>

  );
}


export default TaskDetails;