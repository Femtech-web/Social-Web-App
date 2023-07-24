/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlinePoweroff } from 'react-icons/ai';

import { logout } from '../../Redux/userRedux';
import { useCustomState } from '../../responsive';
import styles from './style';

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ mobile ] = useCustomState();

  const {result: {picture}} = useSelector(state => state.user?.currentUser);
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const handleLogout = () => {
    dispatch(logout());

    navigate('/auth');
  }

  return (
    <div className={styles.container}>
        <div className={styles.profileCont}>
            <div className={styles.imgCont}>
                {picture 
                ? <img src={picture} alt='profile picture' className={styles.img} /> 
                : <p className={styles.imgText}>{user?.result?.fullname.charAt(0) || user?.result?.name.charAt(0)}</p>
                }
            </div>
            <h1 className={styles.text}>{user?.result?.fullname || user?.result?.name}</h1>
            <p className='text-sm text-gray-600'>{user?.result?.email || 'email'}</p>
        </div>
      {mobile 
      ? <div className={styles.logoutBtn}
        onClick={() => handleLogout()}>
        <AiOutlinePoweroff className={styles.icon} fontSize={25}/>
        <span className={styles.logoutText}>Logout</span>
      </div>
      : 'coming soon...'}
    </div>
  )
}

export default User