import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({
  user,
  movies,
  onUpdateUser,
  onDeregister,
  onRemoveFavorite,
  onAddFavorite,
}) => {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    password: "",
    email: user?.email ?? "",
    birthday: user?.birthday ? user.birthday.substring(0, 10) : "",
  });
  useEffect(() => {
    setFormData({
      username: user?.username ?? "",
      password: "",
      email: user?.email ?? "",
      birthday: user?.birthday ? user.birthday.substring(0, 10) : "",
    });
  }, []);

  console.log("User favorites:", user.favoriteMovies);
  console.log(
    "All movies:",
    movies.map((m) => m._id)
  );

  const favoriteMovies = movies.filter((m) =>
    user.favoriteMovies?.includes(m._id)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdateUser(formData, () => {
      // Clear form after successful update
      setFormData({
        username: "",
        password: "",
        email: "",
        birthday: "",
      });
    });
  };

  const handleDeregister = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      onDeregister();
    }
  };

  return (
    <div className="profile-view container mt-4">
      <h2>Profile</h2>

      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            value={formData.username ?? ""}
            placeholder="Enter Username"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password ?? ""}
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email ?? ""}
            placeholder="Enter Email Address"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            name="birthday"
            value={formData.birthday ?? ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
        <Button variant="danger" onClick={handleDeregister} className="ms-3">
          Delete Account
        </Button>
      </Form>

      <hr />

      <h3>Your Favorite Movies</h3>
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <Row className="g-3">
          {favoriteMovies.map((movie) => (
            <Col
              key={movie._id}
              xs={12} // full width on mobile
              sm={6} // 2 per row on small screens
              md={4} // 3 per row on medium+
              lg={3} // 4 per row on large+
              className="d-flex"
            >
              <MovieCard
                movie={movie}
                user={user}
                isFavorite={true}
                onRemoveFavorite={() => onRemoveFavorite(movie._id)}
                onAddFavorite={() => onAddFavorite(movie._id)}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onDeregister: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
};
