import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://taskflow-z53f.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.name);

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 700);

    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server");
    }
  }

  return (
    <div className="auth-page">

      {/* Left Branding */}
      <div className="auth-brand">

        <h1>TaskFlow</h1>

        <p>
          Organize your work.
          <br />
          Stay focused.
          <br />
          Get things done.
        </p>

      </div>


      {/* Login Card */}
      <div className="auth-container">

        <div className="auth-heading">

          <p className="auth-label">
            WELCOME BACK
          </p>

          <h2>
            Login to TaskFlow
          </h2>

          <p>
            Enter your details to access your workspace.
          </p>

        </div>


        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>


          <div className="input-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>


          <button
            type="submit"
            className="auth-submit"
          >
            Login
          </button>

        </form>


        {message && (
          <p
            className={
              message === "Login successful!"
                ? "success-message"
                : "error-message"
            }
          >
            {message}
          </p>
        )}


        <div className="auth-switch">

          <span>
            Don't have an account?
          </span>

          <button
            type="button"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;