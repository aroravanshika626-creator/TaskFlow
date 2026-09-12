import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setMessage("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }

      // Clear any old login data
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("loggedIn");

      setMessage("Signup successful! Please login.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

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


      {/* Signup Card */}
      <div className="auth-container">

        <div className="auth-heading">

          <p className="auth-label">
            GET STARTED
          </p>

          <h2>
            Create your account
          </h2>

          <p>
            Set up your TaskFlow account and start organizing your work.
          </p>

        </div>


        <form onSubmit={handleSignup}>

          <div className="input-group">

            <label htmlFor="name">
              Username
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>


          <div className="input-group">

            <label htmlFor="signup-email">
              Email
            </label>

            <input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>


          <div className="input-group">

            <label htmlFor="signup-password">
              Password
            </label>

            <input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>


          <div className="input-group">

            <label htmlFor="confirm-password">
              Confirm Password
            </label>

            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          </div>


          <button
            type="submit"
            className="auth-submit"
          >
            Create Account
          </button>

        </form>


        {message && (
          <p
            className={
              message === "Signup successful! Please login."
                ? "success-message"
                : "error-message"
            }
          >
            {message}
          </p>
        )}


        <div className="auth-switch">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Signup;