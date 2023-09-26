import React, { useState, useEffect } from 'react';





function Dashboard() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:5000/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-3 mb-3">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                users.map(user => (
                    <div key={user.id} className="card h-50 w-50">
          


                        <div className="card-body">
                            <p className="card-subtitle mb-2 text-body-secondary text-end">{user.privacy_settings}</p>
                            <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
                            <p className="card-subtitle mb-2 text-body-secondary text-start">{user.birth_date}</p>
                            <p className="card-text">{user.email}</p>
                            {/* The following fields are placeholders, since the provided structure and data don't match exactly. 
                                You can adjust or remove them based on your requirements */}
                            <p className="card-text">User Intro Placeholder</p>
                            <h6 className="card-subtitle mb-2 text-body-secondary">User Role Placeholder</h6>
                            {/* Adjust the following link based on where you'd like to direct the user. It's currently just a placeholder. */}
                            <a href="/client/src/components/Home.jsx" target="_blank" rel="noopener noreferrer">Try it!!</a>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Dashboard;
