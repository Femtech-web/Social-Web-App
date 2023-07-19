/* eslint-disable no-unused-vars */

import React, {useState }from 'react'
import style from './style';

import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const LandingPage = () => {
  const [icon, setIcon] = useState(false);
  const handleMouseOver = () => {
    setIcon(true)
  }
  
  const handleMouseOut = () => {
    setIcon(false)
  }

  return (
    <div className={style.container}>
      <img src="/images/heaven.jpg" 
        alt="lilies" 
        className={style.img} 
      />
      <div className={style.overlay}></div>
      <h1 className={style.header}>
        Welcome To Christain&nbsp;
        <span className='text-red-800'>Konnect</span>
      </h1>
      <div className={`${style.hero} z-40`}>
        <div className={style.hero}>
          <p className={style.heroText}>
            Launch into an 
            <br /> amazing experience 
            <br /> with Gods people
          </p>
          <Link to='/posts'>
            <button type='button' className={style.btn}
              onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              Explore {icon && <BsArrowRight className='ml-4 icon-anime' fontSize={20}/> }
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage