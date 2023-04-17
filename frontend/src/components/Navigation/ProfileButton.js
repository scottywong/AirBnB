import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    
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

      <div className="block relative">
        <button onClick={openMenu} className="w-32 h-8 bg-ared cursor-pointer rounded-m transition-shadow shadow-md hover:shadow-lg">
          <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
          <ul className="bg-white rounded-md mt-1 p-2 w-36 shadow-md absolute flex-col justify-center z-10">
            <li className="hover:bg-gray-300 cursor-pointer">{user.email}</li>
            <li className="hover:bg-gray-300 cursor-pointer mt-2"><NavLink to={`/users/${user.id}/spots`}>Spots</NavLink></li>
            <li className="hover:bg-gray-300 cursor-pointer mt-2"><NavLink to={`/users/${user.id}/bookings`}>Bookings</NavLink></li>
            <li className="hover:bg-gray-300 cursor-pointer mt-2">
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
    );
  }
  
export default ProfileButton;