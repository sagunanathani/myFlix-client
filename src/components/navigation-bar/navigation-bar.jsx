import React from "react";
import PropTypes from "prop-types";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLoggedOut(); // Clears auth state in parent
    navigate("/login");
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      className="mb-5 shadow-sm border rounded"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ fontWeight: 700, fontSize: "1.6rem", color: "#0d6efd" }}
        >
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  style={{
                    fontWeight: 600,
                    color: "#0d6efd",
                    marginRight: "1rem",
                  }}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  style={{ fontWeight: 600, color: "#0d6efd" }}
                >
                  Sign Up
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/"
                  style={{
                    fontWeight: 600,
                    color: "#333",
                    marginRight: "1rem",
                  }}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  style={{
                    fontWeight: 600,
                    color: "#333",
                    marginRight: "1rem",
                  }}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  style={{
                    fontWeight: 600,
                    color: "#dc3545",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  user: PropTypes.object,
  onLoggedOut: PropTypes.func.isRequired,
};
