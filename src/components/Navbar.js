import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
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
      <h1 style={{ fontFamily: 'Raleway, sans-serif' ,fontSize: '38px', fontStyle: 'italic'}}>
        <span style={{ color: '#124B84' }}>Win</span>
        <span style={{ color: '#C74627' }}>Atlas</span>
      </h1>

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
