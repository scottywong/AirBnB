// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';


import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

//   if (sessionUser) return (
//     <Redirect to="/" />
//   );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({email , password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    
 
    <div className='login-form-container'>
      <h1>Log into Airbnb</h1>
      <ul>
       {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
        <form className="login-form" onSubmit={handleSubmit}>
         
          
          <label className='login-label'>
            Email
          </label>
          <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          <label className='login-label'>
            Password
          </label>
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </form>
        <button className='login-submit' onClick={handleSubmit} type="submit">Log In</button>

    </div>
    );

}

export default LoginForm;