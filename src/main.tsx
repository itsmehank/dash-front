import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';  // Path relative to src/
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);