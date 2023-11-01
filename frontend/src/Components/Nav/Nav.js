import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  };
  return (
    <div className='navbar'>
      {
        auth ? (
          <ul className='nav-ul'>
            <li>
              <Link to='/'>News</Link>
            </li>
            <li>
              <Link to='/add'>Add Post</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/signup' onClick={logout}>
                Logout ({JSON.parse(auth).name})
              </Link>
            </li>
          </ul>
        ) : (
          <ul className='nav-right'>
            <li>
              <Link to='/signup'>SignUp</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul >
        )}
    </div >
  );
};

export default Nav;