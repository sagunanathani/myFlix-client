export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <img
        src={movie.image}
        alt={movie.title}
        style={{ width: "200px", display: "block", marginBottom: "1rem" }}
      />
      <h2>{movie.title}</h2>
      <p>
        <strong>Description:</strong> {movie.description}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
