import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function UserCard({ user }) {
    return (
        <div key={user.id} className="col-12 col-md-6 mb-3">
            <Link to={`/users/${user.id}`}>
                <div className="card w-100">
                    <img
                        src={user.photo_url || "default_image_url.jpg"}
                        className="card-img-top img-fluid p-3"
                        alt={`${user.first_name} ${user.last_name}`}
                    />
                    <div className="card-body">
                        <p className="card-subtitle mb-2 text-body-secondary text-end">{user.privacy_settings}</p>
                        <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
                        <p className="card-subtitle mb-2 text-body-secondary text-start">{user.birth_date}</p>
                        <p className="card-text">{user.email}</p>
                        {/* Placeholder content below */}
                        <p className="card-text">User Intro Placeholder</p>
                        <h6 className="card-subtitle mb-2 text-body-secondary">User Role Placeholder</h6>
                        <a href="/" className="btn btn-primary" target="_blank" rel="noopener noreferrer">View Profile</a>
                    </div>
                </div>
            </Link>
        </div>
    );
}


function Dashboard() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:5000/users');
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading data: {error.message}</p>;
    }

    return (
        <div className="container">
            <div className="row">
{users.map(user => <UserCard key={user.id} user={user} />)}

            </div>


            
        </div>
    );
}

export default Dashboard;


