import React from 'react';
import { Routes } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <div>
      <h1>Note Taking App</h1>
      <Routes>{routes}</Routes>
    </div>
  );
}

export default App;
