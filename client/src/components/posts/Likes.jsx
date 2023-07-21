/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

import styles from './style';


const Likes = ({ likes }) => {
  const user = useSelector((state) => state.user.currentUser)
  const userId = (user?.result?.googleId || user?.result?._id) ;

  if(likes?.length > 0){
    return likes.find((like) => like === userId) 
    ? (
      <><AiFillLike fontSize={20} className='mb-1'/> &nbsp;{likes.length}</>
    )
    : (
      <><AiOutlineLike fontSize={20} className='mb-1'/><span className={styles.btnSpan}>{likes.length}</span></>
    )
  }

 return <><AiOutlineLike fontSize={20} className='mb-1'/></>
};

export default Likes