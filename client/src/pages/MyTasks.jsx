import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch tasks from MongoDB
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setTasks(data);

    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  // Add / Update task
  async function addTask() {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }

    try {
      // UPDATE
      if (editId) {
        const response = await fetch(
          `http://localhost:5000/api/tasks/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: task,
              description: "",
              completed: tasks.find(
                (item) => item._id === editId
              )?.completed || false,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Unable to update task");
          return;
        }

        setTasks(
          tasks.map((item) =>
            item._id === editId ? data.task : item
          )
        );

        setEditId(null);
        setTask("");

        return;
      }

      // CREATE
      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: task,
            description: "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to create task");
        return;
      }

      setTasks([data.task, ...tasks]);
      setTask("");

    } catch (error) {
      console.error("Error saving task:", error);
      alert("Unable to connect to server");
    }
  }

  // Edit task
  function editTask(item) {
    setTask(item.title);
    setEditId(item._id);
  }

  // Complete / Uncomplete task
  async function toggleTask(id) {
    const selectedTask = tasks.find(
      (item) => item._id === id
    );

    if (!selectedTask) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: selectedTask.title,
            description: selectedTask.description || "",
            completed: !selectedTask.completed,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to update task");
        return;
      }

      setTasks(
        tasks.map((item) =>
          item._id === id ? data.task : item
        )
      );

    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  // Delete task
  async function deleteTask(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to delete task");
        return;
      }

      setTasks(
        tasks.filter((item) => item._id !== id)
      );

    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <div className="app">

      <Sidebar />

      <main className="dashboard">

        <h1>My Tasks</h1>

        <p>
          Add, edit and manage your daily tasks.
        </p>

        <div className="add-task">

          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button onClick={addTask}>
            {editId ? "Update Task" : "Add Task"}
          </button>

        </div>

        <div className="task-list">

          {loading ? (

            <p>Loading tasks...</p>

          ) : tasks.length === 0 ? (

            <p>No tasks added yet.</p>

          ) : (

            tasks.map((item) => (

              <div
                className="task-item"
                key={item._id}
              >

                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item._id)}
                />

                <span
                  className={
                    item.completed ? "done" : ""
                  }
                >
                  {item.title}
                </span>

                <button
                  onClick={() => editTask(item)}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(item._id)}
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </div>

      </main>

    </div>
  );
}

export default MyTasks;
