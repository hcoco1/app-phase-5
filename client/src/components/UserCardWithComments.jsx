import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';


function UserCardWithComments({ user, comments, onCommentSubmit }) {
    const [comment, setComment] = React.useState('');

    const handleSubmit = () => {
        onCommentSubmit(comment);
        setComment('');  // Clear the textarea after submitting
    };

    return (
        <div>
            {/* User Info Card */}
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={user.photo_url } />
                <Card.Body>
                    <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
                    <Card.Text>{user.email}</Card.Text>
                </Card.Body>
            </Card>

            {/* Comments Section */}
            <div>
                {comments.map((c, index) => <p key={index}>{c}</p>)}

                <Form>
                    <Form.Group>
                        <Form.Label>Leave a Comment</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}
export default UserCardWithComments;