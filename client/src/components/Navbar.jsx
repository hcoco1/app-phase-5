import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ background: "#eee", padding: "10px 0", marginBottom: "20px" }}>
      <Link to="/" style={{ margin: "0 20px" }}>Home</Link>
      <Link to="/signup" style={{ margin: "0 20px" }}>Sign Up</Link>
      <Link to="/signin" style={{ margin: "0 20px" }}>Sign In</Link>
      <Link to="/users" className="mobile-only" style={{ margin: "0 20px" }}>All Users</Link>
    </div>
  );
}
  export default Navbar;
  