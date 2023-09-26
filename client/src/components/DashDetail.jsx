import React from "react"
import { useParams } from "react-router-dom"

export default function DashDetail() {
    const params = useParams()
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        fetch(`http://127.0.0.1:5000/users/${params.id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => setUser(data))
        .catch(err => console.error('Fetch error:', err));
    
    }, [params.id])

    
  
    
    return (
        <div className="van-detail-container">
        {user ? (
            <div className="van-detail">
                <img src={user.photo_url} alt={`${user.first_name} ${user.last_name}`} />
                <i className={`van-type ${user.type} selected`}>{user.type}</i>
                <h2>{user.first_name}</h2>
                <p className="user-price"><span>${user.email}</span>/day</p>
                <p>{user.privacy_settings}</p>
                <button className="link-button">Rent this van</button>
            </div>
        ) : <h2>Loading...</h2>}
    </div>
)


    
}