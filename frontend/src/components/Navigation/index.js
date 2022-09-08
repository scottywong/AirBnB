import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from '../../assets/airbnb.png';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({email: 'demo@user.io' , password:'password' }))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }

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
      {isLoaded &&
        (
          <button onClick={handleSubmit}> Demo User </button>
        )}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;