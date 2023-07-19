/* eslint-disable no-unused-vars */

import React from 'react';
import style from './style';
import objLogo from '../../../assets/logo-white.svg'

const Logo = () => {
  return (
    <div className={style.container}>
      <img src={objLogo} alt="logo" />
    </div>
  )
}

export default Logo