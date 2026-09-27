import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

const initialTasks = [
  {
    id: 1,
    title: "Finish React components",
    description: "Complete the UI for all pages including navigation and styling.",
    priority: "High",
    category: "Development",
    dueDate: "2025-04-27",
    completed: false,
  },
  {
    id: 2,
    title: "Study for DSA",
    description: "Revise arrays, strings and recursion.",
    priority: "Medium",
    category: "Study",
    dueDate: "2025-04-27",
    completed: false,
  },
  {
    id: 3,
    title: "Update GitHub repository",
    description: "Push latest changes and update README.",
    priority: "Low",
    category: "Git",
    dueDate: "2025-04-27",
    completed: true,
  },
  {
    id: 4,
    title: "Prepare for Jenkins setup",
    description: "Install Jenkins and configure pipeline.",
    priority: "High",
    category: "DevOps",
    dueDate: "2025-04-27",
    completed: false,
  },
  {
    id: 5,
    title: "Read a chapter",
    description: "Read 1 chapter of the current book.",
    priority: "Medium",
    category: "Personal",
    dueDate: "2025-04-27",
    completed: false,
  },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);

  // Add a new task
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  // Toggle completed / pending
  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === Number(id)
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== Number(id))
    );
  };

  // Update task
  const updateTask = (id, updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === Number(id)
          ? { ...task, ...updatedTask }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}