import React from "react"
import {Outlet, NavLink } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';

export default function DashLayout() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "none",
        backgroundColor: "var(--bs-nature2)",
        borderRadius: 10,
        padding: 5
    }
    return (
        <>
            <Nav 
            className="justify-content-center" 
            activeKey="/home"
            style={{ padding: '2px' }}

            >
                <NavLink
                    to="/users"
                    end
                    style={({ isActive }) => isActive ? activeStyles : null}
                    className="nestedNavLink"
                >
                    People
                </NavLink>

                <NavLink
                    to="/users/posts"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    className="nestedNavLink"
                >
                    Posts
                </NavLink>

                <NavLink
                    to="/users/events"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    className="nestedNavLink"
                >
                    Events
                </NavLink>

            </Nav>
            <Outlet />
        </>
    )
}