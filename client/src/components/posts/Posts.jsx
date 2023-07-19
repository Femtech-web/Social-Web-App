/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Post from './Post';
import styles from './style';
import { fetchAllPosts } from '../../Redux/apiCalls';

const Posts = ({ isNotSearchLocation, setSearchQuery }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.post.posts);

  useEffect(() => {
    if(location.pathname !== '/posts/search'){
      setSearchQuery('')
      fetchAllPosts(dispatch);
    }
  }, [dispatch, location, setSearchQuery])

  return (
    <div className={styles.posts(isNotSearchLocation)}>
      {allPosts.length !== 0 
      ? allPosts.map((post) => (
        <Post key={post._id} {...post} />
      )) 
      : <div className={styles.noPost}>
          <p>{!isNotSearchLocation ? 'No result found':'No post to display. Be the first to post'}</p>
        </div>
      }
    </div>
  )
}

export default Posts