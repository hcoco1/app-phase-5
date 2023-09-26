function App() {
    return (
      <div>
        <NavigationBar />
        <Routes>{routes}</Routes>
       </div>
    );
  }
  
  export default App;

  import { Link } from 'react-router-dom';

  function NavigationBar() {
      return (
          <nav className="navbar  navbar-expand-lg bg-body-"  >
              <div className="container-fluid">
                  
                  <img
                      src="/favicon.ico"   // Path to your favicon
                      alt="Brand Icon"
                      width="30"
                      height="30"
                      className="d-inline-block align-text-top me-2"
                  />
                  <Link className="navbar-brand" to="/">Ivan Arias</Link>
                  <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarTogglerDemo02"
                      aria-controls="navbarTogglerDemo02"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                  >
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                              <Link className="nav-link" to="/">Home</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to="/signin">Sign In   <i className="bi bi-person-fill"></i></Link>
                             
  
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to="/signup">Sign Up   <i className="bi bi-person-plus-fill"></i></Link>
                          </li>
                      </ul>
             
                  </div>
              </div>
          </nav>
      );
  }
  
  export default NavigationBar;
  

