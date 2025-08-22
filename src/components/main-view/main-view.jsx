import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
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
    if (stored) {
      const parsedUser = JSON.parse(stored);
      console.log("Parsed user from localStorage:", parsedUser);
      return parsedUser;
    }
    return null;
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

  //Update user
  const handleUpdateUser = (formData, onSuccess) => {
    const updatedData = {
      username: formData.username,
      email: formData.email,
      birthday: formData.birthday,
    };

    if (formData.password) {
      updatedData.password = formData.password; // only if provided
    }

    fetch(`https://myflix-movie-api-2r07.onrender.com/users/${user.username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then(async (res) => {
        if (!res.ok) {
          let errorMessage = "Failed to update user";
          try {
            const errorData = await res.json();
            if (errorData.message) {
              errorMessage = errorData.message;
            } else {
              errorMessage = JSON.stringify(errorData);
            }
          } catch {}
          throw new Error(errorMessage);
        }
        return res.json();
      })
      .then((updatedUser) => {
        console.log("Update successful. New user data:", updatedUser);
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // ✅ Automatically re-login if password or username was changed
        if (formData.password || formData.username !== user.username) {
          fetch("https://myflix-movie-api-2r07.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: updatedData.username,
              password:
                formData.password ||
                prompt("Re-enter your password to confirm:"),
            }),
          })
            .then((res) => res.json())
            .then((loginData) => {
              if (loginData.token) {
                localStorage.setItem("token", loginData.token);
                console.log("Auto-login successful");
              }
            })
            .catch((err) => console.error("Auto-login failed", err));
        }

        alert("Profile updated successfully!");
        if (typeof onSuccess === "function") onSuccess();
      })
      .catch((error) => {
        console.error("Update user error:", error);
        alert("Error updating profile: " + error.message);
      });
  };

  // delete user
  const handleDeregister = () => {
    fetch(`https://myflix-movie-api-2r07.onrender.com/users/${user.username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to deregister");
        }
        alert("Account deleted successfully.");
        handleLogout();
      })
      .catch((error) => {
        console.error(error);
        alert("Error deleting account.");
      });
  };

  // Add favourite movie
  const handleAddFavorite = (movieId) => {
    console.log("Adding favorite for movie:", movieId);
    fetch(
      `https://myflix-movie-api-2r07.onrender.com/users/${user.username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add favorite");
        return res.json();
      })
      .then((updatedUser) => {
        console.log("Updated user after adding favorite:", updatedUser);
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser)); // save locally
        alert("Adding favorite successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Error adding favorite: " + error.message);
      });
  };

  // Remove favourite movie
  const handleRemoveFavorite = (movieId) => {
    console.log("Deleting favorite for movie:", movieId);
    fetch(
      `https://myflix-movie-api-2r07.onrender.com/users/${user.username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to remove favorite");
        return res.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((error) => {
        console.error(error);
        alert("Error removing favorite.");
      });
  };

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
          {/* Route for movies list */}
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/signin" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-4" key={movie._id} md={3}>
                      <MovieCard
                        movie={movie}
                        isFavorite={user?.favoriteMovies?.includes(movie._id)}
                        onAddFavorite={handleAddFavorite}
                        onRemoveFavorite={handleRemoveFavorite}
                      />
                    </Col>
                  ))}
                </>
              )
            }
          />

          {/* Profile route */}
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/signin" replace />
              ) : (
                <Col md={6}>
                  <ProfileView
                    user={user}
                    movies={movies}
                    onUpdateUser={handleUpdateUser}
                    onDeregister={handleDeregister}
                    onAddFavorite={handleAddFavorite}
                    onRemoveFavorite={handleRemoveFavorite}
                  />
                </Col>
              )
            }
          />

          {/* Signup route */}
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

          {/* Login route */}
          <Route
            path="/signin"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                </Col>
              )
            }
          />

          {/* Movie detail view */}
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/signin" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <MovieView
                  movies={movies}
                  user={user}
                  handleAddFavorite={handleAddFavorite}
                  handleRemoveFavorite={handleRemoveFavorite}
                />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
