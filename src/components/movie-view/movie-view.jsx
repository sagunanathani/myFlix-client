import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./movie-view.css";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch the current movie
    fetch(`https://myflix-movie-api-2r07.onrender.com/movies/id/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie:", error));

    // Fetch all movies for similar filtering
    fetch(`https://myflix-movie-api-2r07.onrender.com/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [movieId]);

  if (!movie) {
    return <div>Loading movie...</div>;
  }

  // Similar movies: same genre, exclude current movie
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
                  <Card.Title className="mb-3">{movie.Title}</Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {movie.Description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Genre:</strong> {movie.Genre?.Name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Director:</strong> {movie.Director?.Name}
                  </Card.Text>
                  <Button className="back-button" onClick={() => navigate(-1)}>
                    <i className="fas fa-arrow-left me-2"></i> Back to Movies
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="mt-5">
          <h3>Similar Movies</h3>
          <Row>
            {similarMovies.map((sm) => (
              <Col key={sm._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <MovieCard movie={sm} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};
