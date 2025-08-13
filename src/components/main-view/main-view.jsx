import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; // import the MovieView component that fetches the movie by ID
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ProfileView } from "../profile-view/profile-view";
import "./main-view.css";

export const MainView = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
    console.log("Parsed user from localStorage:", parsedUser);
    return parsedUser;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch("https://myflix-movie-api-2r07.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        return res.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      // Save to localStorage to persist on reload:
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                </Col>
              )
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <MovieView />
              )
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={6}>
                  <ProfileView user={user} /> {/* <-- Pass user here */}
                </Col>
              )
            }
          />

          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-4" key={movie._id} md={3}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
