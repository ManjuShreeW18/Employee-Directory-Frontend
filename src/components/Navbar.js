import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  });

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <img src="./WinWireLogo.png" alt="winwirelogo" className='winlogo'/>
      <h2>{title}</h2>
      <div>
        {isLoggedIn && (
          <>

            <span>
                {user.fullname} ({user.role}) &nbsp;
            </span>
            
            <button className="nav-btn" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <Link to="/dashboard"></Link>
            
          </>
        )}

        {isLoggedIn ? (
          <button className='logout' onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login"></Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
