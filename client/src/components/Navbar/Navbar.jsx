/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode'
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

import styles from './style';
import { useCustomState } from '../../responsive';
import { logout } from '../../Redux/userRedux';
import { fetchPostsBySearch } from '../../Redux/apiCalls';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ mobile ] = useCustomState();
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const {result: {picture}} = useSelector(state => state.user?.currentUser);

  useEffect(() => {
    const token = user?.token;

    let decodedToken;

    if(token !== undefined){
      try {
        decodedToken = decode(token);
      } catch (error) {
        console.log(error);
      }

      if(decodedToken?.exp * 1000 < new Date().getTime()) dispatch(logout());
    }
    
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [location]);

  const handleSearch = () => {
    if(searchQuery === ''){
      return
    }

    fetchPostsBySearch(dispatch, searchQuery);
    navigate(`/posts/search?query=${searchQuery}`)
  }

  return (
    <div className={styles.container}>
      <div className='w-full flex justify-between items-center'>
        {mobile 
          && <Link to='/posts'>
            <img src='./images/no-bg.png' className='w-[50%] text-center mb-2'/>
          </Link>
        }
        <div className='relative'>
          <BiSearch 
            className={styles.icon} 
            fontSize={20}
            onClick={handleSearch}
          />
          <input type="text"  
            className={styles.input(mobile)}
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={styles.rightBar}>
         {!mobile && <Link to='/create-post'>
            <button type='button' className={styles.btn}>
              {!mobile && 'Create Post'}
              <AiOutlinePlus className={!mobile && 'ml-3'} fontSize={20}/>
            </button>
          </Link>}
          {!mobile && <div className={styles.profileCont}>
            <div className={styles.imgCont}>
            {picture ? <img src={picture} alt='profile picture' className={styles.img} /> 
            : <p className={styles.imgText}>{user?.result?.fullname.charAt(0) || user?.result?.name.charAt(0)}</p>}
            </div>
            <div className='ml-2'>
              <p className={styles.text}>{user?.result?.fullname || user?.result?.name}</p>
              <small className='text-slate-500 block -mt-1'>see your profile</small>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Navbar