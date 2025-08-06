import { useState } from "react";
import "./signup-view.css";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();

    fetch("https://flix-fusion-api-movies-51cd1c6d37f8.herokuapp.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        birthday: birthday,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Signup details:", data);
        alert("Signup successful! Please log in.");
        setUsername("");
        setPassword("");
        setEmail("");
        setBirthday("");
      })
      .catch((err) => {
        console.log("Signup error:", err);
        alert("Signup failed");
      });
  };
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <p>Create your account to start watching!</p>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Birthday:
          <input
            name="birthday"
            type="date"
            placeholder="Birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
