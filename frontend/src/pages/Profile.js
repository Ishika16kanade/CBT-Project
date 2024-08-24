


import { useState } from 'react';
import './Profile.css'; // External CSS for styling

function ProfileCard() {
    const { user, isAuthenticates, isLoading } = useState('');
    const userData = {
        name: 'John Doe',
        bio: 'Full Stack Developer',
        mobileno: '6266701009',
        avatar: 'https://example.com/avatar.jpg',
    };
    return (
        <div className="profile-card">
            {/* <div className="profile-card-header">
                <img
                    // src={user.avatarUrl || 'https://via.placeholder.com/150'}
                    src='https://www.google.com/url?sa=i&url=https%3A%2F%2Flovepik.com%2Fimages%2Fpng-profile-card.html&psig=AOvVaw1wivTeRX0ujb5z4Y77HRDS&ust=1723612811309000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLDVy5yc8YcDFQAAAAAdAAAAABAE'

                    className="profile-avatar"
                />
                <h2 className="profile-name">{user.firstname}</h2> 
                <p className="profile-bio">Bio</p>
            </div> */}
            <div className="profile-card-body">

                <p className="profile-info"><strong>Name:{userData.name}:</strong> </p>
                <p className="profile-info"><strong>Bio:{userData.bio}</strong> </p>
                <p className="profile-info"><strong>Mobile No:{userData.mobileno}</strong> </p>
                <button className="profile-button">View Profile</button>
            </div>
        </div>
    );
}

export default ProfileCard;

