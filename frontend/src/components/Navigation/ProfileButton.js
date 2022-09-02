import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    // console.log(user)
    
    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };
    
    useEffect(() => {
      if (!showMenu) return;
  
      const closeMenu = () => {
        setShowMenu(false);
      };
  
      document.addEventListener('click', closeMenu);
    
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
  
    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
    };
  
    return (
      <div className="profile-container">
        <button onClick={openMenu} className="profile-button">
          <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>{user.email}</li>
            <li><NavLink to={`/users/${user.id}/spots`}>Spots</NavLink></li>
            <li><NavLink to={`/users/${user.id}/bookings`}>Bookings</NavLink></li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
    );
  }
  
export default ProfileButton;