//- LoginView handles the network request and validation
import { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
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
    <Container className="d-flex justify-content-center align-items-center mt-5 px-3">
      <Card style={{ width: "22rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                aria-label="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                aria-label="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
