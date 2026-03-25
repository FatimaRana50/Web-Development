# React Router App

A simple React application that implements client-side routing using React Router. It includes three pages: Home, About, and Contact — with a fully controlled form on the Contact page.

## Features

- Client-side navigation using React Router (no page reloads)
- Three pages: Home, About, and Contact
- Controlled form on the Contact page with useState
- Form validation-ready with onChange handlers
- Global styling with index.css

## Pages

| Page | Description |
|---|---|
| Home | Welcome message |
| About | Brief info about the app |
| Contact | Form with name, email, and message fields |

## Getting Started

### 1. Install dependencies
npm install

### 2. Start the development server
npm start

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

src/
├── Components/
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── App.js
├── index.js
└── index.css

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm test` | Launches the test runner |

## Built With

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Create React App](https://github.com/facebook/create-react-app)