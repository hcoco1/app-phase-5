import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import DashBoard from './DashBoard';
import DashDetail from './DashDetail';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Navbar from './Navbar';
import Home from './Home';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { checkSession } from '../features/counter/auth/authSlice';





const routes = [
  {
    path: "/",
    main: () => <Home />,
  },
  {
    path: "/signup",
    main: () => <SignUp />,
  },
  {
    path: "/signin",
    main: () => <SignIn />,
  },
  {
    path: "/users",
    main: () => <div></div>
  },
  {
    path: "/users/:id",
    main: DashDetail
  }
];

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user has an active session on initial app load
    dispatch(checkSession());
  }, [dispatch]); 






  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated || false);

 


  return (
    <Router>
      <Navbar />
      <div style={{ display: "flex" }}>
        <div className="sidebar" style={{ padding: "10px", width: "30%", background: "#f0f0f0", overflowY: 'auto', maxHeight: '100vh' }}>
          {isAuthenticated && <DashBoard />}
        </div>
        <div className="main-content" style={{ flex: 1, padding: "10px" }}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.main />} />
            ))}
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;










