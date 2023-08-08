/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
import { TfiComment } from 'react-icons/tfi';
import { CiShare1 } from 'react-icons/ci'

import styles from './style';
import Likes from './Likes';
import { useCustomState } from '../../responsive';
import { deletePost, fetchLike } from '../../Redux/apiCalls';
import { removeCurrentId, setCurrentId } from '../../Redux/postRedux';

const Post = ({ title, context, creator, createdAt, selectedFile, imgUrl, _id, name, likes, expand, comments }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ full, setFull ] = useState(false);
  const [ editor, setEditor ] = useState(false);
  const [ postLikes, setPostLikes ] = useState(likes);
  const [ mobile ] = useCustomState();

  const user = useSelector((state) => state.user.currentUser)
  const {result: {picture}} = useSelector(state => state.user?.currentUser);
  const userId = (user?.result?.googleId || user?.result?._id) ;
  const isNotCreator = creator !== user?.result?._id;
  const hasLikedPost = postLikes?.find((id) => id === userId);

  const imgAmount = selectedFile?.length !== 0 ? selectedFile : null;
  const one = imgAmount?.length === 1;
  const two = imgAmount?.length === 2;
  const three = imgAmount?.length === 3;
  const four = imgAmount?.length === 4;
  const five = imgAmount?.length === 5;

  useEffect(() => {
    if(location.pathname !== "/create-post"){
      dispatch(removeCurrentId())
    }

    if(expand){
      setFull(true);
    }

    setPostLikes(likes)
  },[ location, dispatch, expand, likes ])

  const handleEdit = () => {
    setEditor(false);

    dispatch(setCurrentId(_id));
    navigate('/create-post');
  }

  const handleDelete = async () => {
    setEditor(false);

    await deletePost(dispatch, _id);
    window.scrollTo(0, 0)
  }

  const likePost = () => {
    fetchLike(dispatch, _id)

    if(hasLikedPost){
      setPostLikes(postLikes.filter((id) => id !== userId))
    } else{
      setPostLikes([...postLikes, userId])
    }
  }
  
  return (
    <div className='w-full my-6'>
      <div className={styles.topCont} 
        onClick={(e) => e.target.className.includes('top-container') && navigate(`/posts/${_id}`)}
      >
        <div className={styles.profileCont}>
          <div className={styles.imgCont}>
           {picture || imgUrl ? <img src={picture || imgUrl} alt='profile picture' className={styles.img} /> 
           : <p className={styles.imgText}>{name?.charAt(0)}</p>}
          </div>
          <div className='ml-2'>
            <p className={styles.text}>{name}</p>
            <small className={styles.small}>{moment(createdAt).fromNow() + ' .'}</small>
          </div>
        </div>
        <FiMoreHorizontal fontSize={20} className={styles.more} onClick={() => setEditor(true)}/>
        {editor && <div className={styles.editor}>
          <div className='mr-6'>
            <button disabled={isNotCreator} 
              className={styles.editorIcon(isNotCreator)} 
              onClick={handleEdit}><AiOutlineEdit className='mr-2' /> 
              Edit
            </button>
            <button disabled={isNotCreator} 
              className={styles.editorIcon(isNotCreator)} 
              onClick={handleDelete}><AiOutlineDelete className='mr-2' /> 
              Delete
            </button>
          </div>
          <AiOutlineClose className='cursor-pointer' onClick={() => setEditor(false)} />
        </div>}
      </div>
      <div className={styles.middleCont}>
        <h1 className={styles.header}>{title}</h1>
        <article className={styles.article} onClick={() => setFull(!full)}>
         {!full ? `${context?.slice(0, 250)}` : `${context}`} &nbsp;
         {!full && <span className={styles.seeMore}>...see more</span>}
        </article>
        {(one || two ) 
        && <div className={`${one ? 'image-grid1': 'image-grid2'}`}>
          {imgAmount?.map((item) => (
            <img src={item} alt="post image" key={item} className='grid-img'/>
          ))}
        </div>}
        {(three || four || five ) 
        && <div className={`image-grid3`}>
            <div className='img-sub1'>
              {imgAmount?.map((item, index) => (
              index <= 1 
              ? <img src={item} alt="post image" key={item} className='flex-img1'/> : null
              ))}
            </div>
            <div className='img-sub2'>
              {imgAmount?.map((item, index) => (
              index >= 2
              ? <img src={item} alt="post image" key={item} className='flex-img2'/> : null
              ))}
            </div>
        </div>}
      </div>
      <div className={styles.btns(mobile)}>
        <button type='button' className={styles.btnClick} onClick={likePost}>
          <Likes likes={postLikes} />
        </button>
        <button type='button' className={`${styles.btnClick} ${mobile ? 'ml-1' : 'ml-3'}`} onClick={() => navigate(`/posts/${_id}`)}>
          {comments?.length !== 0 
          ? (<>
              <TfiComment fontSize={18}/> 
              <span className={styles.btnSpan}>{comments?.length}</span>
            </>)
          : <TfiComment fontSize={18}/>}
        </button>
        <button type='button' className={`${styles.btnClick} ${mobile ? 'ml-1' : 'ml-3'}`}>
          <CiShare1 className='' fontSize={18}/> 
          <span className={styles.btnSpan} />
        </button>
      </div>
    </div>
  )
}

export default Post