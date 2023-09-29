import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../features/users/usersSlice';

export default function DashDetail() {
    const navigate = useNavigate(); // Use useNavigate instead of useNavigation

    const dispatch = useDispatch();
    const params = useParams();
    const [user, setUser] = React.useState(null);

    // Access state from Redux store
    const loading = useSelector(state => state.users.loading);
    const error = useSelector(state => state.users.error);
    const userDeleted = useSelector(state => state.users.userDeleted);

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/users/${params.id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setUser(data))
            .catch(err => console.error('Fetch error:', err));

    }, [params.id])

    function deleteUser() {
        fetch(`http://127.0.0.1:5555/users/${params.id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) {
                    dispatch(removeUser(params.id)); // Update the Redux store
                    navigate('/'); // Navigate to the dashboard
                } else {
                    return res.json().then(data => {
                        throw new Error(data.Message);
                    });
                }
            })
            .catch(error => {
                console.error("There was an error deleting the user:", error);
            });
    }
    

    return (
        <div className="container">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {userDeleted ? (
                <p>User has been deleted.</p>
            ) : (
                user && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <div>
                            <img
                                src={user.photo_url}
                                alt={`${user.first_name} ${user.last_name}`}
                                className="img-fluid"
                            />
                            <h2>{user.first_name}</h2>
                            <p>{user.privacy_settings}</p>
                            <button onClick={deleteUser}>Delete User</button>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}
