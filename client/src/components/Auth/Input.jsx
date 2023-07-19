/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';
import styles from './style';


const Input = ({ name, type, placeholder, handleChange, label, icon, value }) => {
  return (
    <div className='mt-4 w-full relative'>
      <label className={styles.label}>{label}</label>
      <input 
        type={type} 
        name={name}
        value={value} 
        placeholder={placeholder}
        onChange={handleChange}
        className={styles.input}
      />
      {icon}
    </div>
  )
}

export default Input