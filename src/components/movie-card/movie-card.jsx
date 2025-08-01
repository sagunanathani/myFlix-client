// import the PropTypes library
import PropTypes from "prop-types";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => onMovieClick(movie)}
      style={{
        cursor: "pointer",
        marginBottom: "1rem",
        border: "1px solid #ccc",
        padding: "1rem",
      }}
    >
      <h3>{movie.Title}</h3>
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
