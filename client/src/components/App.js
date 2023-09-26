import React from 'react';
import { Routes } from 'react-router-dom';
import routes from './routes';
import NavigationBar from './NavigationBar'; 


function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>{routes}</Routes>
     </div>
  );
}

export default App;

