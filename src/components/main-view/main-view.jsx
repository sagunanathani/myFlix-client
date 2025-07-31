import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
// Export MainView so it can be used in other files
// const MainView = () => {} defines a functional component
// const means MainView can't be reassigned
export const MainView = () => {
  // This is a functional component that returns JSX (looks like HTML)
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A mind-bending thriller by Christopher Nolan.",
      image: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
      genre: "Sci-Fi",
      director: "Christopher Nolan",
    },
    {
      id: 2,
      title: "Interstellar",
      description: "A journey through space and time.",
      image:
        "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
      genre: "Adventure",
      director: "Christopher Nolan",
    },
    {
      id: 3,
      title: "The Matrix",
      description: "Reality is an illusion.",
      image: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
      genre: "Action",
      director: "Wachowskis",
    },
  ]);

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
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={setSelectedMovie}
        />
      ))}
    </div>
  );
};
