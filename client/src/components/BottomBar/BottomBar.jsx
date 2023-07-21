/* eslint-disable no-unused-vars */

import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

import styles from './styles';
import { navLinks } from '../../dummy';


const BottomBar = () => {

  const Home = (link) =>  link.name === 'Home';
  const Prayer = (link) => link.name === 'Prayer requests';

  return (
    <div className={styles.container}>
       {navLinks.map((link, index) => (
          index === 2 
          ?  <Link to='/create-post' key={index}>
              <button type='button' className={styles.btn}>
                <AiOutlinePlus  fontSize={27}/>
              </button> 
            </Link>
          : <Link key={index}  to={Home(link) ? '/posts': Prayer(link) ? `/${link.name.split(' ')[0].toLowerCase()}`
          :`/${link.name.toLowerCase()}`}>{link.icon}</Link>
      ))}
    </div>
  )
}

export default BottomBar