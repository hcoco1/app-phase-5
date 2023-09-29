import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../features/counter/auth/authSlice';  // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);


    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const handleLogout = async () => {
        try {
            dispatch(signOutUser());
            navigate('/login'); // Redirect to login or homepage after logout
        } catch (error) {
            console.error("Failed to logout:", error.message);
        }
    };

    return (
        <div style={{ background: "#eee", padding: "10px 0", marginBottom: "20px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
                {/* Always shown */}
                <Link to="/" style={{ margin: "0 20px" }}>Home</Link>

                {/* If the user is not authenticated */}
                {!isAuthenticated && (
                    <>
                        <Link to="/signup" style={{ margin: "0 20px" }}>Sign Up</Link>
                        <Link to="/signin" style={{ margin: "0 20px" }}>Sign In</Link>
                    </>
                )}

                {/* If the user is authenticated */}
                {isAuthenticated && (
                    <>
                        <span style={{ margin: "0 20px" }}>Hi, {user?.first_name}</span>  {/* Assuming user object has a name field */}
                        <Link to="/users">All Users</Link>
                        <button type="button" className="btn btn-warning" onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;

  