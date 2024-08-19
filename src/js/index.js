import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './component/home'; // Ensure this path is correct
import '../styles/index.css'; // Ensure this path is correct

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
