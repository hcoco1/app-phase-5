import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function UserCard() {
  return (
    <Link to={`/users/${user.id}`}>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={user.photo_url || "default_image_url.jpg"} />
      <Card.Body>
        <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
        <Card.Text>
        {user.email} {user.birth_date}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>

    </Link>

  );
}

export default UserCard;


function UserCard({ user }) {
    return (
        <div key={user.id} className="col-6 col-md-4 mb-3">
            <Link to={`/users/${user.id}`}>
                <div className="card w-70">
                    <p className="card-subtitle mb-2 text-body-secondary text-end">{user.privacy_settings}</p>
                    <img
                        src={user.photo_url || "default_image_url.jpg"}
                        className="img-fluid rounded-circle"
                        alt="Profile"
                        style={{ width: '100px', height: '100px', padding: '5px' }} // Adjust width, height, and padding as needed
                    />

                    <div className="card-body">

                        <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
                        <p className="card-subtitle mb-2 text-body-secondary text-start">{user.birth_date}</p>
                        <p className="card-text">{user.email}</p>
                        {/* Placeholder content below */}

                    </div>
                </div>
            </Link>
        </div>
    );
}