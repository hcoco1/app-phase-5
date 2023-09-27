import React from 'react';
// eslint-disable-next-line
import ReactDOM, { createRoot } from 'react-dom/client'; 
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


// Use the new ReactDOM.createRoot API
const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(

    <App />
  
);