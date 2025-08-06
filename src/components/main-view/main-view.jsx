import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
// Export MainView so it can be used in other files
// const MainView = () => {} defines a functional component
// const means MainView can't be reassigned
const MainView = () => {
  // This is a functional component that returns JSX (looks like HTML)
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://myflix-movie-api-2r07.onrender.com/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        console.log("Movies from API:", data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    // React.Fragment / <>...</> /  <div> </div> lets us return multiple elements without a wrapper div
    <div className="card-container">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(selectedMovie) => setSelectedMovie(selectedMovie)}
        />
      ))}
    </div>
  );
};

export default MainView;
