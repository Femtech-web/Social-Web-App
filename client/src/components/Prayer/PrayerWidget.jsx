/* eslint-disable no-unused-vars */

import React from 'react';
import styles from './style';
import { Link } from 'react-router-dom';

const PrayerWidget = () => {
  const amount = [1,2,3,4,5,6,7,8,9,10]
  const value = window.innerHeight/90;
  const limit = Math.ceil(value) - 2;
  
  return (
    <div className={styles.container}>
      <div className={styles.headerCont}>
        <h1 className={styles.header}>Prayer Requests</h1>
        <Link to='/prayer'><p className={styles.link}>view all</p></Link>
      </div>
      <div>
        {amount.slice(0, limit).map((item) => (
          <div key={item} className={styles.profileCont}>
            <img 
              src="./images/pic.jpg" 
              alt="profile image" 
              className={styles.img}
            />
            <div className='ml-2'>
              <div>
                <p className={styles.text}>Akolade Oluwafemi &nbsp;
                <span className={styles.said}>said</span></p>
                <p className='text-sm'>Please help me to pray that...</p>
                <small className={styles.ago}>2m ago .</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PrayerWidget