import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

export const ProfileView = ({ user }) => {
  console.log("ProfileView user:", user);

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "30rem" }} className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4 text-center">Your Profile</Card.Title>

          <Card.Text>
            <strong>👤 Username:</strong>
            <span className="ms-2">{user.username}</span>
          </Card.Text>

          <Card.Text>
            <strong>📧 Email:</strong>
            <span className="ms-2">{user.email}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};
