import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./movie-view.css";

export const MovieView = ({ movie, onBackClick }) => {
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
                  <Button className="back-button" onClick={onBackClick}>
                    <i className="fas fa-arrow-left me-2"></i> Back to Movies
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
