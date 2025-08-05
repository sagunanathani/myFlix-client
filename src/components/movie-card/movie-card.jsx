// import the PropTypes library
import PropTypes from "prop-types";
import "./MovieCard.css";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      <img src={movie.ImagePath} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <button className="view-button">View Details</button>
    </div>
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
  onMovieClick: PropTypes.func.isRequired,
};
