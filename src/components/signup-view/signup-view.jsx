import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./signup-view.css";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();

    fetch("https://myflix-movie-api-2r07.onrender.com/users", {
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
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "28rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Sign Up</Card.Title>
          <Card.Text className="text-center mb-3">
            Create your account to start watching!
          </Card.Text>

          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="success" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
