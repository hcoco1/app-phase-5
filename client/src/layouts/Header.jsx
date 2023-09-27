import React from "react"
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "none",
    backgroundColor: "var(--bs-nature)",
    borderRadius: 10,
    padding: 5
  }
  return (
    <Nav className="justify-content-center navContainer " activeKey="/home">

      <div className="navLinks">
        <NavLink
          to="/"
          style={({ isActive }) => isActive ? activeStyles : null}
          
          className="navLinks"
        >
          Home
        </NavLink>
      </div>

      <div className="navLinks">
        <NavLink
          to="/signup"
          style={({ isActive }) => isActive ? activeStyles : null}
          className="nav-link"
        >
          Sign Up
        </NavLink>
      </div>

      <div className="navLinks">
        <NavLink
          to="/signin"
          style={({ isActive }) => isActive ? activeStyles : null}
          className="nav-link"
        >
          Sign In
        </NavLink>
      </div>

      <div className="navLinks">
        <NavLink
          to="/users"
          style={({ isActive }) => isActive ? activeStyles : null}
          className="nav-link"
        >
          Dashboard
        </NavLink>
      </div>


    </Nav>



  )
}