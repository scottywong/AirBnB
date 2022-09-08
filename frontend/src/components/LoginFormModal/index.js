// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css';
import { NavLink } from 'react-router-dom';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  console.log('showModal', showModal);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <>
          <Modal onClose={() => setShowModal(false)}>
            <div className='modal-content'>
            <LoginForm />
              <div className='signup-message'>
              Not signed up yet? <NavLink onClick={() => setShowModal(false)} to="/signup">Sign Up</NavLink>
              </div>
            </div>
          </Modal>
   
        </>
      )}
    </>
  );
}

export default LoginFormModal;