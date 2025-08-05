export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view-container">
      <img
        src={movie.ImagePath}
        alt={movie.Title}
        className="movie-view-image"
      />
      <div className="movie-view-details">
        <h2 className="movie-title">{movie.Title}</h2>

        <p>
          <strong>Description:</strong> <span>{movie.Description}</span>
        </p>
        <p>
          <strong>Genre:</strong> <span>{movie.Genre?.Name}</span>
        </p>
        <p>
          <strong>Director:</strong> <span>{movie.Director?.Name}</span>
        </p>

        <button className="back-button" onClick={onBackClick}>
          ← Back to Movies
        </button>
      </div>
    </div>
  );
};
