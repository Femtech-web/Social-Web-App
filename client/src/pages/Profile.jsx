/* eslint-disable no-unused-vars */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlinePoweroff } from 'react-icons/ai';

import { logout } from '../Redux/userRedux';
import {useCustomState} from '../responsive'

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ mobile ] = useCustomState();

  const handleLogout = () => {
    dispatch(logout());

    navigate('/auth');
  }

  return (
    <div className='text-center mt-6'>
      {mobile 
      ? <div className='border-red-600 border-[2px] hover:bg-red-200 py-2 flex justify-center mx-5 items-center cursor-pointer text-white'
        onClick={() => handleLogout()}>
        <AiOutlinePoweroff className='mr-3 text-black' fontSize={25}/>
        <span className='font-semibold text-black'>Logout</span>
      </div>
      : 'coming soon...'}
    </div>
  )
}

export default Profile