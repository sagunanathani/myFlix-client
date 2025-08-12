import { createRoot } from "react-dom/client";
import MainView from "./components/main-view/main-view.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const App = () => {
  return (
    <div className="app-container">
      {/* <header className="site-header">
        <h1>🎬 Welcome to myFlix</h1>
        <p>Discover, watch & love your movies</p>
      </header> */}

      <main>
        <Row className="justify-content-center my-4">
          <Col md={10}>
            <MainView />
          </Col>
        </Row>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} myFlix.</p>
        Built with ❤️ by Saguna Nathani
      </footer>
    </div>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
