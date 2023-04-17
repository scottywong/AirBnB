import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from '../../assets/airbnb.png';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  
  const handleHost = (e) => {
    e.preventDefault();
    history.push('/host');
  }
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
      </>
    );
  }

  return (
    isLoaded &&(
    <ul className="border-b border-gray-400 dotted mx-auto" >
      <NavLink exact to="/" className="">
          <img className="inline-block h-20 pl-20" src={logo}/>
      </NavLink> 
      <li className="flex float-right p-25 pr-20 pt-5"> 
        
          <>
          {!sessionUser && <button onClick={handleHost}> Become a Host </button>}
          <button onClick={handleSubmit}> Demo User </button>
          </>
        {sessionLinks}
      </li>
    </ul>
  )
    
  );
}

export default Navigation;