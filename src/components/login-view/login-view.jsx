//- LoginView handles the network request and validation
import { useState } from "react";
import PropTypes from "prop-types";
import "./login-view.css";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic form validation
    if (!username || !password) {
      alert("Both fields are required!");
      return;
    }

    const data = { username: username, password: password };

    fetch("https://myflix-movie-api-2r07.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user && data.token) {
          onLoggedIn(data.user, data.token);
          console.log("Logged in user:", data.user);
          console.log("Token received:", data.token);
          alert("Login successful!");
          setUsername("");
          setPassword("");
        } else {
          alert("Invalid credentials.");
        }
      })
      .catch((error) => {
        alert("Login error");
        console.error(error);
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
