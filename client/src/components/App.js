import React from 'react';
import { Routes } from 'react-router-dom';
import routes from './routes';
import NavigationBar from './NavigationBar'; // Import the NavigationBar component

function App() {
  return (
    <div>
      <NavigationBar /> {/* Add the NavigationBar component here */}
      <Routes>{routes}</Routes>
    </div>
  );
}

export default App;

