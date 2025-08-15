// import the PropTypes library
import React from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./movie-card.css";

// The MovieCard function component
export const MovieCard = ({
  movie,
  isFavorite = false,
  onAddFavorite = () => {},
  onRemoveFavorite = () => {},
}) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${movie._id}`} className="btn btn-primary me-2">
          Open
        </Link>
        {isFavorite ? (
          <Button variant="danger" onClick={() => onRemoveFavorite(movie._id)}>
            Remove Favorite
          </Button>
        ) : (
          <Button
            variant="outline-primary"
            onClick={() => onAddFavorite(movie._id)}
          >
            Add Favorite
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

// where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool,
  onAddFavorite: PropTypes.func,
  onRemoveFavorite: PropTypes.func,
};
