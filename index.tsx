/**
 * @file index.tsx
 * @description This is the main entry point for the Femmora React application.
 * It finds the 'root' DOM element and renders the main <App /> component into it.
 * React.StrictMode is used to highlight potential problems in the application.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Find the root element in the public/index.html file where the app will be mounted.
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create a React root for the main element.
const root = ReactDOM.createRoot(rootElement);

// Render the main App component within StrictMode.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);