# myFlix Client

## Hosting

- **Frontend (React app):** [Netlify](https://myflix-movies-sagunanathani.netlify.app/)
- **Backend API:** [Render](https://myflix-movie-api-2r07.onrender.com/)
- **GitHub Repo:** [myFlix-client](https://github.com/sagunanathani/myFlix-client)

---

## Short & Clean Version

React.js frontend for browsing movies, viewing details, and managing favorites.

### Features

- Browse movies with cards displaying images and info
- Filter movies by title
- View detailed movie info
- User authentication (login/signup)
- Add movies to favorites

### Technologies

- React.js, React Router, Bootstrap/CSS
- JWT authentication
- LocalStorage for session persistence

### Installation

```bash
git clone https://github.com/sagunanathani/myFlix-client.git
cd myFlix-client
npm install
npm start

Hosting:
    Frontend (Netlify): https://myflix-movies-sagunanathani.netlify.app/
    Backend API (Render): https://myflix-movie-api-2r07.onrender.com/

Project Evolution (Feature Branches):
    render-api-movies: Integrated frontend with backend API (Render) and added PropTypes validation
    auth-forms-feature: Implemented Login and Signup forms with session management
    react-bootstrap-styling: Added Bootstrap styling and responsive layout
    feature-routing: Implemented routing, profile view, and similar movies display
    finalize-project: Final review, consistent styling, and movie filter feature


Long Version: Full Documentation
# myFlix Client

This is the front-end application for the myFlix project built with HTML, CSS, and JavaScript. Parcel is used as the bundler.

## How to Run

1. Install dependencies:
   npm install
2. Start the app:
   npm start

1> 🔀 Feature Branch: render-api-movies

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
│ └── main-view.jsx
├── movie-card/
│ └── movie-card.jsx
├── movie-view/
│ └── movie-view.jsx
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

2> 🔀 Feature Branch: auth-forms-feature
This branch implements authentication forms for the myFlix React client, including Login and Signup functionality, with form validation, token storage, and authenticated API requests.

✅ Features Implemented:
🔑 Authentication & Session Management
Login view using form (LoginView)
Validates user credentials before login
On success, stores user & token in localStorage
Logout button added in MainView for authenticated users
Signup view using form (SignupView)
Validates required fields: username, password, email, birthday
Creates new user via POST to /users endpoint
MainView conditionally displays views:
Shows LoginView or SignupView if not authenticated
Shows movie list if authenticated
Fetch request to /movies includes Authorization: Bearer <token> header
User session persists across refresh via localStorage
In Short:
Login form → stores user + JWT token in localStorage
Signup form → validates username, password, email, birthday
API requests include Authorization: Bearer <token> header
Session persists on refresh

🧪 Validation
Both forms include basic client-side validation:
Required field checks
Email input type for signup
Date input type for birthday

📁 Folder Structure
myFlix-client/
├── package.json
└── src/
├── index.html
├── index.jsx
├── index.scss
└── components/
├── login-view/
│ └── login-view.jsx
├── signup-view/
│ └── signup-view.jsx
├── main-view/
│ └── main-view.jsx
├── movie-card/
│ └── movie-card.jsx
└── movie-view/
└── movie-view.jsx

💻 To Run This Branch Locally:
git checkout auth-forms-feature /
npm install /
npm start

3> 🔀 Feature Branch: react-bootstrap-styling

This branch implements React Bootstrap styling across the myFlix React client, improving the visual layout and responsiveness of the application.

✅ Features Added:
Installed react-bootstrap and bootstrap via npm
Imported Bootstrap styles in src/index.scss
Applied a responsive layout using <Container>, <Row>, and <Col> in MainView
Replaced standard HTML elements with React Bootstrap components:
Form, Button, Card, Container, Row, Col, etc.
Customized Bootstrap components to maintain consistent UI/UX
Improved login and signup forms with Bootstrap styling

💻 To test this branch locally:
git checkout react-bootstrap-styling
npm install
npm start

4> 🔀 Branch: feature-routing

This branch implements state-based routing, a user profile view, and similar movies in the myFlix React client. Users can navigate between views, manage their profile, and explore related movies.

✅ Features

1. Routing & Navigation
   Uses react-router-dom with BrowserRouter.
   Replaces setSelectedMovie with <Link> navigation.
   Navigation Bar:
   Unauthenticated: Login / Signup
   Authenticated: Home, Profile, Logout

2. Profile View (profile-view.jsx)
   Display & update user info (username, email, birthday, password).
   Deregister account.
   Show favorite movies with Favorite / Remove Favorite buttons.

3. Similar Movies (movie-view.jsx)
   Displays movies of the same genre as the selected movie.
   Uses MovieCard to render similar movies.

4. Styling
   Bootstrap components for layout: Container, Row, Col, Card, Button.
   Consistent styling for navigation, profile view, and similar movies.

📁 Folder Structure
src/
├── index.html
├── index.jsx
├── index.scss
└── components/
├── login-view/login-view.jsx
├── signup-view/signup-view.jsx
├── main-view/main-view.jsx
├── movie-card/movie-card.jsx
├── movie-view/movie-view.jsx
└── profile-view/profile-view.jsx

💻 Run Locally
git checkout feature-routing
npm install
npm start

🧪 Testing
Routing & Navigation: Verify navbar links and movie navigation.
Profile View: Update user info, manage favorites, deregister account.
Similar Movies: Ensure movies of the same genre appear; clicking navigates correctly.

5> 🔀 Branch: finalize-project

A React.js frontend for browsing movies, viewing details, and managing favorites.

## Features

- Browse movies with cards displaying images and basic info
- Filter movies by title
- View detailed information about each movie
- User authentication with login and signup
- Add movies to favorites

## Technologies Used

- React.js
- React Router
- Bootstrap / CSS
- JWT for authentication
- LocalStorage for session persistence

## Installation

1. Clone the repo: `https://github.com/sagunanathani/myFlix-client/tree/finalize-project`
2. Install dependencies: `npm install`
3. Run the app: `npm start`

## Hosting

Hosted on Netlify: [https://myflix-movies-sagunanathani.netlify.app/]

## Notes

- Ensure your backend API is running before using the app
- Compatible with modern browsers
```
