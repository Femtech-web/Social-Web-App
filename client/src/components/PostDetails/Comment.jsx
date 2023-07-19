/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';
import styles from './style';


const Comments = ({comment}) => {
  return (
    <div className={styles.commentCont}>
      <div className={styles.imgCont}>
        <p className={styles.imgText}>{comment.split('/')[0].charAt(0)}</p>
      </div>
      <div className={styles.comment}>
        <p className='text-[0.7rem]'>{comment.split('/')[0]}</p>
        {comment.split('/')[1]}
      </div>
    </div>
  )
}

export default Comments