import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Completed() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  async function fetchCompletedTasks() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      const completedTasks = data.filter(
        (item) => item.completed === true
      );

      setTasks(completedTasks);
    } catch (error) {
      console.error(
        "Error fetching completed tasks:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">

      <Sidebar />

      <main className="dashboard">

        <h1>Completed Tasks</h1>

        <p>
          Your finished tasks are here.
        </p>

        <div className="task-list">

          {loading ? (
            <p>Loading completed tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No completed tasks yet.</p>
          ) : (
            tasks.map((item) => (
              <div
                className="task-item"
                key={item._id}
              >
                <span className="done">
                  {item.title}
                </span>
              </div>
            ))
          )}

        </div>

      </main>

    </div>
  );
}

export default Completed;