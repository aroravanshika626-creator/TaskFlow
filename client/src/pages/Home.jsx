import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* Navbar */}
      <header className="home-nav">

        <div className="home-logo">
          TaskFlow
        </div>

        <div className="home-nav-right">

          <span>
            Manage your work smarter
          </span>

          <Link to="/login">
            Login
          </Link>

        </div>

      </header>


      {/* Hero Section */}
      <main className="home">

        <div className="home-content">

          <p className="home-label">
            SIMPLE. ORGANIZED. PRODUCTIVE.
          </p>

          <h1>
            Organize Your Tasks,
            <br />
            <span>Boost Your Productivity</span>
          </h1>

          <p className="home-description">
            Plan. Track. Complete. Succeed.
          </p>

          <p className="home-subtext">
            Manage your daily tasks and stay organized
            with TaskFlow.
          </p>


          {/* Buttons */}
          <div className="home-buttons">

            {/* Get Started → Signup */}
            <Link to="/signup">
              <button className="primary-home-btn">
                Get Started
              </button>
            </Link>


            {/* Login → Login */}
            <Link to="/login">
              <button className="secondary-home-btn">
                Login
              </button>
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Home;