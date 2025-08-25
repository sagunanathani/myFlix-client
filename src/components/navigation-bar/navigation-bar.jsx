import React from "react";
import PropTypes from "prop-types";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./navigation-bar.css";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLoggedOut();
    navigate("/signin");
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      className="navbar-custom mb-5 shadow-sm border rounded"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          myFlix
        </Navbar.Brand>
        <div className="ms-auto">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/signin" className="nav-link-custom">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link-custom">
                  Sign Up
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/" className="nav-link-home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="nav-link-home">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="nav-link-logout">
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
