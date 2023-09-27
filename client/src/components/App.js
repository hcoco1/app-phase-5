import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from './DashBoard';
import DashDetail from './DashDetail';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Navbar from './Navbar';
import Home from './Home';




const routes = [
  {
    path: "/",
    main: () => <Home />,
    sidebar: () => <div>home!</div>
  },
  {
    path: "/signup",
    main: () => <SignUp />,
    sidebar: () => <div>Sign Up!</div>
  },
  {
    path: "/signin",
    main: () => <SignIn />,
    sidebar: () => <div>Sign In!</div>
  },
  {
    path: "/users",
    main: () => <DashBoard />,
    sidebar: () => <div>DashBoard!</div>
  },
  {
    path: "users/:id",
    main: DashDetail,
    sidebar: () =>  <div>DashDetail</div>
  }
  
];





function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ display: "flex" }}>
        <div className="sidebar" style={{ padding: "10px", width: "40%", background: "#f0f0f0" }}>
          <DashBoard />
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







