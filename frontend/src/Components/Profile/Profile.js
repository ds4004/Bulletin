import React from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
    let user = JSON.parse(localStorage.getItem("user"));

    let image = user.profileImage || "https://reactjs.org/logo-og.png";
    let count = user.count || 0;
    return (
        <div className="profile-container">
            <div className="card">
                <div className="profile-header">
                    <div className="profile-image-container">
                        {image ? (
                            <div className="profile-image-wrapper">
                                <img className="profile-image" src={image} alt="Profile" />
                                <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                            </div>
                        ) : (
                            <img src={image} alt="React" className='profile-img' />
                        )}
                    </div>
                    <div className="profile-details">
                        <h1 className="profile-name">Name: {user.name}</h1>
                        <p className="profile-email">Email Id: {user.email}</p>
                        <div className="profile-extra-details">
                            <h3>News Posted: {count}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}