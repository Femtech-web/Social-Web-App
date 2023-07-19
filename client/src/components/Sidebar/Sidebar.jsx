/* eslint-disable no-unused-vars */

import React from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

import styles from './style';
import { navLinks } from "../../dummy";
import Logo from '../Elements/Logo/Logo';
import { logout } from '../../Redux/userRedux';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const Home = (link) =>  link.name === 'Home';
  const Prayer = (link) => link.name === 'Prayer requests'

  const handleLogout = () => {
    dispatch(logout());

    navigate('/auth');
  }

  return (
    <div className={styles.container}>
      <Link to="/posts">
        <Logo />
      </Link>
    
      <div className=''>
        {navLinks.map((link) => (
          <NavLink
          to={Home(link) ? '/posts': Prayer(link) ? `/${link.name.split(' ')[0].toLowerCase()}`
          :`/${link.name.toLowerCase()}`}
          key={link.name}
          onClick={() => {}}
          style= {({ isActive }) => ({ backgroundColor: isActive ? '#ff0033': ''})}
          className={({ isActive }) => isActive ? styles.activeLink : styles.normalLink}
          >
            {link.icon}
            <span>{link.name}</span> 
          </NavLink>
          
        ))}
      </div>
        <div className={styles.logout} onClick={() => handleLogout()}>
          <AiOutlinePoweroff className='mr-3'/>
          <span className='font-semibold '>Logout</span>
        </div>
    </div>
  )
}

export default Sidebar