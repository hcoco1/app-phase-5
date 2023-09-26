import React from 'react';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import DashDetail from './DashDetail';

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link className="site-logo" to="/">#hcoco1</Link>
        <nav>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/users">Dashboard</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/users" element={<Dashboard />} />
        <Route path="/users/:id" element={<DashDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;






/*function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>{routes}</Routes>
     </div>
  );
}*/