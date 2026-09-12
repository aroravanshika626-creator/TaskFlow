import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  function logout() {
    // Remove authentication token
    localStorage.removeItem("token");

    // Remove saved username
    localStorage.removeItem("username");

    // Remove old login status if it exists
    localStorage.removeItem("loggedIn");

    // Go to login page
    navigate("/login");
  }

  return (
    <aside className="sidebar">

      <h2>
        TaskFlow
      </h2>

      <nav>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/tasks">
          My Tasks
        </Link>

        <Link to="/completed">
          Completed
        </Link>

        <button
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;