import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setStatus, setError} from '../features/users/usersSlice';




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


function Dashboard({ searchQuery = "" }) {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.list);

    const status = useSelector(state => state.users.status);
    const error = useSelector(state => state.users.error);

    useEffect(() => {
        async function fetchData() {
            dispatch(setStatus('loading'));
            try {
                const response = await fetch('http://127.0.0.1:5555/users');
                if (!response.ok) {
                    throw new Error('Oops, something went wrong! Please try again later.'); // User-friendly error message
                }
                const data = await response.json();
                dispatch(setUsers(data));
                dispatch(setStatus('succeeded'));
            } catch (err) {
                dispatch(setError(err.toString()));
                dispatch(setStatus('failed'));
            }
        }
        fetchData();
    }, [dispatch]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error loading data: {error}</p>;
    }

    return (
        <div className="d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    {users.map(user => (
                        <Col xs={12} md={12} key={user.id} className="mb-3 d-flex justify-content-center">
                            <UserCard user={user} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;


