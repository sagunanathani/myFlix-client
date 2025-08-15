import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./movie-view.css";

export const MovieView = ({
  user,
  handleAddFavorite,
  handleRemoveFavorite,
}) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!movieId) return; // prevent fetch if undefined

    const token = localStorage.getItem("token");

    // Fetch current movie
    fetch(`https://myflix-movie-api-2r07.onrender.com/movies/id/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie:", error));

    // Fetch all movies
    fetch(`https://myflix-movie-api-2r07.onrender.com/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [movieId]);

  if (!movie) return <div>Loading movie...</div>;

  const similarMovies = movies.filter(
    (m) => m.Genre?.Name === movie.Genre?.Name && m._id !== movie._id
  );

  return (
    <Container className="my-5 movie-view-section">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow movie-view-card custom-box">
            <Row className="g-0">
              <Col md={5}>
                <Card.Img
                  src={movie.ImagePath}
                  alt={movie.Title}
                  className="img-fluid h-100 object-fit-cover"
                />
              </Col>
              <Col md={7}>
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {movie.Description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Genre:</strong> {movie.Genre?.Name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Director:</strong> {movie.Director?.Name}
                  </Card.Text>

                  <Button className="mt-2" onClick={() => navigate(-1)}>
                    ← Back to Movies
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {similarMovies.length > 0 && (
        <div className="mt-5">
          <h3>Similar Movies</h3>
          <Row>
            {similarMovies.map((sm) => (
              <Col key={sm._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <MovieCard
                  movie={sm}
                  isFavorite={user?.favoriteMovies?.includes(sm._id)}
                  onAddFavorite={handleAddFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};
