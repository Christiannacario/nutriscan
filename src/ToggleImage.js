import React, { useState, useEffect } from 'react';
import './Design/css/ToggleImage.css';
import img from './img/icon.png'
import person from './img/person.png'
import axios from 'axios';
import { Link } from 'react-router-dom';


function ToggleImage() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState({ username: '', role: '' });

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        axios.post('/login', { email: 'example@example.com', password: 'examplePassword' })
            .then(response => {
                if (response.data.message === "Success") {
                    setUser({ username: response.data.username });
                } else {
                    console.error('Login failed');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

  return (
    <div className="imageToggle">
      <div className="profile-picture" onClick={toggleSidebar}>
        <img src={img} alt="Profile" />
      </div>
      {isSidebarOpen && (
        <div className="sidebar">
          <div className="triangle-up"></div>
          <div className="sidebar-content">
            <div className="profile-info">
              <img src={person} alt="Profile" />
            </div>
            <ul>
              <li>My Profile</li>
              <hr></hr>
              <Link to="/login" className='btnLogout'>Logout</Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToggleImage
