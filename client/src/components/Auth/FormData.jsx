/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';
import styles from './style';
import { FcGoogle } from 'react-icons/fc';
import  { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import LoaderSpinner from './loaderSpinner';

import Input from './Input';

const FormData = ({ 
  isSignUp, 
  setIsSignUp, 
  formData, 
  handleChange, 
  handleClick,  
  handleSubmit, 
  showPassword,  
  login, 
  error, 
  fetchError,
  isRequesting,
  setIsRequesting 
}) => {
    
  return (
    <form className={`${styles.formCont}`} onSubmit={handleSubmit}>
    <p className={styles.subHead}>
    {isSignUp 
      ? 'Create an Account'
      : 'Welcome Back'
    }
    </p>
    <p className='text-red-500 text-sm'>{error.emptyField 
    ? 'Fill in all inputs!' 
    : error.passwordMismatch 
    ? 'password do not match!' 
    : error.shortPassword 
    ? 'password is too short!' 
    : fetchError ? `${fetchError}` : ''}</p>

    {isSignUp && 
    <Input 
    label='Full Name'
    name='fullname'
    type='text'
    value={formData.fullname}
    placeholder='Firstname Lastname'
    handleChange={handleChange}
    />}
    <Input 
    label='Email'
    name='email'
    type='email'
    value={formData.email}
    placeholder='name@email.com'
    handleChange={handleChange}
    />
    <Input 
    label='Password'
    name='password'
    type={showPassword ? 'text' : 'password'}
    value={formData.password}
    placeholder='*******'
    handleChange={handleChange}
    icon={showPassword 
    ? <MdVisibilityOff  fontSize={20} className={styles.icon} onClick={handleClick}/> 
    : <MdVisibility  fontSize={20} className={styles.icon} onClick={handleClick}/>}
    />
    {isSignUp && 
    <Input 
    label='Confirm Password'
    name='confirmPassword'
    type='password'
    value={formData.confirmPassword}
    placeholder='*******'
    handleChange={handleChange}
    />}
      
    <div className='w-full mt-[15%]'>
    {isRequesting && <LoaderSpinner styles='spin' variant='spin-small' />}
        <button className={styles.btn} type='submit'> 
            {isSignUp ? 'create my free account' : 'Log in'}
        </button>
        <p className='text-center my-2'>OR</p>
        <button className={styles.btn}
            onClick={() => login()}> 
            {isSignUp ? 'Sign up with Google' : 'Log in with Google'}
            <FcGoogle fontSize={25} className='ml-4'/>
        </button>
    </div>

    {!isSignUp && <p className={styles.links2}>Forgot my password?</p>}
    <div className='mt-3 text-sm'>
        { isSignUp 
        ? "Already have an Account?" : "Don't have an account?"} 
        &nbsp;
        { isSignUp 
        ? (<span className={styles.links}
            onClick={() => setIsSignUp(false)}>
            Log in
            </span>) 
        : (<span className={styles.links}
            onClick={() => setIsSignUp(true)}>
            Sign up
        </span>)
        }
    </div>
</form>
  )
}

export default FormData