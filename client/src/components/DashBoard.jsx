import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




function UserCard({ user }) {
    return (
        <Link to={`/users/${user.id}`}>
            <Card className="user-card">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <Card.Img 
                                variant="top" 
                                src={user.photo_url || "default_image_url.jpg"} 
                                style={{ width: '80px', height: '80px', padding: '5px' }} 
                            />
                        </Col>
                    </Row>
                </Container>
                <Card.Body className="text-center">
                    <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
                    <Card.Text>
                        
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
}


function Dashboard({  searchQuery = ""  }) {
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

                // Check for incomplete user data after populating the array
                data.forEach(user => {
                    if (!user.first_name || !user.last_name || !user.email) {
                        console.error('Incomplete user data:', user);
                    }
                });

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
        <div className="d-flex align-items-center"> 
            <Container>

        
                <Row className="justify-content-center">
                    {users.map(user => (
                        <Col xs={12} md={12} key={user.id} className="mb-3 d-flex justify-content-center">
                            <UserCard user={user} style={{ width: '90%' }}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;


