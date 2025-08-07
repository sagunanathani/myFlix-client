// - MainView takes care of storing and using the authenticated session info
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import "./main-view.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  if (!user) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center">
        <Card>
          {view === "login" ? (
            <>
              <LoginView
                onLoggedIn={(user, token) => {
                  localStorage.setItem("user", JSON.stringify(user));
                  localStorage.setItem("token", token);
                  setUser(user);
                  setToken(token);
                }}
              />
              <div className="text-center mt-3">
                <p>
                  Don’t have an account?{" "}
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setView("signup")}
                  >
                    Sign Up
                  </Button>
                </p>
              </div>
            </>
          ) : (
            <>
              <SignupView />
              <div className="text-center mt-3">
                <p>
                  Already registered?{" "}
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setView("login")}
                  >
                    Log In
                  </Button>
                </p>
              </div>
            </>
          )}
        </Card>
      </Container>
    );
  }

  if (selectedMovie) {
    return (
      <Container className="py-4">
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </Container>
    );
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h2>Welcome, {user.username}!</h2>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Row>
        {movies.map((movie) => (
          <Col md={3} sm={6} xs={12} className="mb-4" key={movie._id}>
            <MovieCard
              movie={movie}
              onMovieClick={(selectedMovie) => setSelectedMovie(selectedMovie)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MainView;
