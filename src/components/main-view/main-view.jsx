// - MainView takes care of storing and using the authenticated session info
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import "./main-view.css";

// Export MainView so it can be used in other files
// const MainView = () => {} defines a functional component
// const means MainView can't be reassigned
export const MainView = () => {
  // This is a functional component that returns JSX (looks like HTML)
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [movies, setMovies] = useState([]);
  const [view, setView] = useState("login");

  // Fetch movies only if token exists
  useEffect(() => {
    if (!token) {
      //console.error("No token found, please log in first");
      return;
    }
    fetch("https://myflix-movie-api-2r07.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        {view === "login" ? (
          <>
            <LoginView
              onLoggedIn={(user, token) => {
                localStorage.setItem("user", JSON.stringify(user)); // store user
                localStorage.setItem("token", token); //store token
                setUser(user); //update state
                setToken(token);
              }}
            />
            <p>
              Don't have an account?{" "}
              <button
                className="Signup-login"
                onClick={() => setView("signup")}
              >
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <SignupView />
            <br />
            <p>
              Already have an account?{" "}
              <button className="Signup-login" onClick={() => setView("login")}>
                Log In
              </button>
            </p>
          </>
        )}
      </>
    );
  }

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
      <div className="user-info">
        <button
          className="logout-button"
          onClick={() => {
            setUser(null);
            setToken(null);
            //localStorage.clear();
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }}
        >
          Logout
        </button>
        <h1>Welcome, {user.username}!</h1>
      </div>
      <div className="card-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(selectedMovie) => setSelectedMovie(selectedMovie)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainView;
