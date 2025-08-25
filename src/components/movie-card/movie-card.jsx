// import the PropTypes library
import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFavorite(movie._id);
    } else {
      onAddFavorite(movie._id);
    }
  };

  const handleOpenMovie = () => {
    navigate(`/movies/${movie._id}`);
  };

  return (
    <Card className="movie-card">
      {/* Favorite Icon */}
      <div
        className={`favorite-icon ${isFavorite ? "favorite" : ""}`}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? "❤️" : "🤍"} {/* Filled vs empty heart */}
      </div>
      {/* Movie Image with double-click to open */}
      <Card.Img
        variant="top"
        src={movie.ImagePath}
        className="movie-card-img"
        onDoubleClick={handleOpenMovie} // double-click on image opens movie
      />

      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button
          className="me-2"
          variant="primary"
          onClick={handleOpenMovie} // single click opens movie
        >
          Open
        </Button>
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
