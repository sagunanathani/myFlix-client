# myFlix Client

This is the front-end application for the myFlix project built with HTML, CSS, and JavaScript. Parcel is used as the bundler.

## How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

🔐 Feature Branch: auth-forms-feature
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
