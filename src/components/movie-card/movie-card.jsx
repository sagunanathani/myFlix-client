// import the PropTypes library
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./movie-card.css";
import { Link } from "react-router-dom";

// The MovieCard function component
export const MovieCard = ({ movie }) => {
  return (
    <Card className="movie-card shadow-sm">
      <Card.Img
        variant="top"
        src={movie.ImagePath}
        alt={`${movie.Title} poster`}
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

// where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
    }),
    ImagePath: PropTypes.string,
  }).isRequired,
};
