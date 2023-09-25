import React from 'react';
// eslint-disable-next-line
import ReactDOM, { createRoot } from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

// Use the new ReactDOM.createRoot API
const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
