import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from '../../assets/airbnb.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className="nav-container" >
      <NavLink exact to="/" className="home-button">
        <a href="" className="airbnb-logo">
          <img height="80px"className="airbnb-logo" src={logo}/>
        </a>
      </NavLink> 
      <li className="link-container"> 
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;