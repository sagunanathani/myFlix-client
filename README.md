# myFlix Client

This is the front-end application for the myFlix project built with HTML, CSS, and JavaScript. Parcel is used as the bundler.

## How to Run

1. Install dependencies:

   ```bash
   npm install
   ```
   
🎬 Feature Branch: render-api-movies
This branch integrates the myFlix React client with the myFlix API, enabling the app to fetch and display real movie data from the backend. It also introduces component prop-type validation for improved type safety.

✅ Features Implemented
🔗 API Integration
Replaced hardcoded movies array with a useState([]) initialized empty array.
Movie data is fetched from the hosted myFlix API (e.g., (https://flix-fusion-api-movies-51cd1c6d37f8.herokuapp.com/movies)) using a fetch() request.
Fetched movies are stored in component state using setMovies(data).
Movie data is passed into child components (MovieCard, MovieView) via props.

📦 PropTypes Usage
All major components now include PropTypes for props validation:
MovieCard
MovieView
Others receiving props from MainView

Example:
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

⚙️ Backend Configuration (Part 1 Summary)
A temporary change was made to the myFlix API backend for development:
Removed passport.authenticate('jwt', { session: false }) middleware from /movies endpoint.
This allows unauthenticated fetch requests while integrating the front-end.
Backend GitHub branch: remove-auth-temporarily
Updated deployment pushed to Heroku:
git push heroku main

📁 Project Structure
myFlix-client/
├── package.json
└── src/
    ├── index.jsx
    ├── index.scss
    └── components/
        ├── main-view/
        │   └── main-view.jsx
        ├── movie-card/
        │   └── movie-card.jsx
        ├── movie-view/
        │   └── movie-view.jsx
        └── ...
📦 Installed Packages
npm install prop-types
💻 To Test Locally
git checkout render-api-movies /
npm install /
npm start

🌐 Deployment Update
Originally, the myFlix API was deployed to Heroku, but due to Heroku's free tier shutdown, the API is now deployed to Render.

✅ New Deployment Platform: Render
Render is now used to host the myFlix API.
The client app fetches live movie data directly from the Render deployment.

✅ Render API Base URL:
https://myflix-movie-api-2r07.onrender.com/

🚀 Features Implemented in This Branch
🔗 API Integration (with Render)
Removed hardcoded movies array.
Replaced it with dynamic data fetched from the myFlix API via fetch.
Updated state with live movie data using useEffect and setMovies.

🔒 Backend Auth Temporarily Relaxed
Disabled passport.authenticate('jwt') on /movies endpoint temporarily for ease of frontend development.

These changes were pushed and deployed on Render.
✅ PropTypes Added
All movie-related components (e.g., MovieCard, MovieView) use PropTypes for validation.

🛠 Technologies Used
React
React Bootstrap
PropTypes
Fetch API
Render (backend deployment)

