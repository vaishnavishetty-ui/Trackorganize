import { NavLink } from "react-router-dom";

import {
  Home,
  ListTodo,
  PlusCircle,
} from "lucide-react";


function Sidebar() {

  return (

    <aside className="sidebar">

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? "nav-item active"
            : "nav-item"
        }
      >

        <Home size={18} />

        <span>
          Home
        </span>

      </NavLink>


      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          isActive
            ? "nav-item active"
            : "nav-item"
        }
      >

        <ListTodo size={18} />

        <span>
          Tasks
        </span>

      </NavLink>


      <NavLink
        to="/add-task"
        className={({ isActive }) =>
          isActive
            ? "nav-item active"
            : "nav-item"
        }
      >

        <PlusCircle size={18} />

        <span>
          Add Task
        </span>

      </NavLink>

    </aside>
  );
}


export default Sidebar;