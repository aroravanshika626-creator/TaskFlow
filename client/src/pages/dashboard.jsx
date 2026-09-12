import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username") || "there";

  const hour = new Date().getHours();

  let greeting;

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
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

      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingTasks = tasks.filter(
    (item) => !item.completed
  ).length;

  const recentTasks = tasks.slice(0, 4);

  return (
    <div className="app">

      <Sidebar />

      <main className="dashboard">

        <div className="dashboard-header">

          <div>
            <p className="dashboard-label">
              OVERVIEW
            </p>

            <h1>
              {greeting}, {username}
            </h1>

            <p className="dashboard-subtitle">
              Here's an overview of your tasks and productivity.
            </p>
          </div>

        </div>


        <div className="dashboard-cards">

          <div className="card">
            <div className="card-top">
              <span className="card-label">
                TOTAL TASKS
              </span>

              <span className="card-icon">
                #
              </span>
            </div>

            <h2>
              {loading ? "—" : tasks.length}
            </h2>

            <p>
              All your tasks
            </p>
          </div>


          <div className="card">
            <div className="card-top">
              <span className="card-label">
                COMPLETED
              </span>

              <span className="card-icon">
                ✓
              </span>
            </div>

            <h2>
              {loading ? "—" : completedTasks}
            </h2>

            <p>
              Finished tasks
            </p>
          </div>


          <div className="card">
            <div className="card-top">
              <span className="card-label">
                PENDING
              </span>

              <span className="card-icon">
                ○
              </span>
            </div>

            <h2>
              {loading ? "—" : pendingTasks}
            </h2>

            <p>
              Tasks remaining
            </p>
          </div>

        </div>


        <section className="recent-section">

          <div className="section-header">

            <div>
              <p className="section-label">
                WORKSPACE
              </p>

              <h2 id="r-task">
                Recent Tasks
              </h2>
            </div>

            <Link to="/tasks">
              <button className="view-all-btn">
                View all
              </button>
            </Link>

          </div>


          <div className="recent-list">

            {loading ? (

              <div className="empty-state">
                Loading tasks...
              </div>

            ) : recentTasks.length === 0 ? (

              <div className="empty-state">
                No tasks available yet.
              </div>

            ) : (

              recentTasks.map((item) => (

                <div
                  className="recent-task"
                  key={item._id}
                >

                  <div className="task-status">
                    {item.completed ? "✓" : ""}
                  </div>

                  <span
                    className={
                      item.completed ? "recent-done" : ""
                    }
                  >
                    {item.title}
                  </span>

                  <span className="task-state">
                    {item.completed
                      ? "Completed"
                      : "Pending"}
                  </span>

                </div>

              ))

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;