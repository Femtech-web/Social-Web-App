/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IoMdSend } from 'react-icons/io';

import Post from '../posts/Post';
import styles from './style'
import Comment from './Comment';
import { fetchAPost } from '../../Redux/apiCalls';
import { Spinner } from '../Elements';
import { fetchComments } from '../../Redux/apiCalls';
import Sidebar from '../Sidebar/Sidebar';

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const commentsRef = useRef();
  const [ comments, setComments ] = useState(post?.comments);
  const [ comment, setComment ] = useState('');

  useEffect(() => {
    fetchAPost(dispatch, id)
    setComments(post?.comments)
  }, [post])

  const handleClick = async () => {
    const finalComment = `${currentUser?.result.fullname} / ${comment}`;
    const newComment = await fetchComments(dispatch, {finalComment}, post._id);

    setComments(newComment)
    setComment('')

    commentsRef.current.scrollIntoView({ behavior: 'smooth'})
  };

  if(!post){
    return <Spinner />
  }

  return (
    <div className='bg-gray-200'>
      <Sidebar />
      <div className={styles.contTwo}>
        <Post {...post} expand={true} comments={comments}/>
        <div className='mt-6 w-full'>
          <h1>Comments</h1>
          {comments?.length !== 0 
          ? comments?.map((item, index) => (
            <Comment key={index} comment={item} />
          )) 
          : <p className='text-center'>Be the first to comment</p>
          }
        </div>
      </div>
      <div className={styles.contThree}>
        <div className='relative w-full'>
          <input type="text" 
            className={styles.input} 
            onChange={(e) => setComment(e.target.value)}
            placeholder='write a comment...' 
            value={comment}
          />
          <IoMdSend fontSize={22} className={styles.sendBtn} onClick={handleClick}/>
        </div>
      </div>
      <div ref={commentsRef} />
    </div>
  )
}

export default PostDetails