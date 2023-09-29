import React from 'react';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await dispatch(signOutUser());
            navigate('/login'); // Redirect to login or homepage after logout
        } catch (error) {
            // Handle any errors that occurred during logout
            console.error("Failed to logout:", error.message);
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default SignOut;
