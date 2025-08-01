// import the PropTypes library
import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <img
        src={movie.ImagePath}
        alt={movie.Title}
        style={{ width: "200px", display: "block", marginBottom: "1rem" }}
      />
      <h2>{movie.Title}</h2>
      <p>
        <strong>Description:</strong> {movie.Description}
      </p>
      <p>
        <strong>Genre:</strong> {movie.Genre?.Name}
      </p>
      <p>
        <strong>Director:</strong> {movie.Director?.Name}
      </p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
