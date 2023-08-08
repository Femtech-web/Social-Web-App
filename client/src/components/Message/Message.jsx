/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useRef } from 'react';
import { BsArrowLeft, BsArrowDown } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';

import Sidebar from '../Sidebar/Sidebar';
import styles from './style';
import AllMessage from './AllMessage';
import { socket } from '../../socket/connection';

const Message = ({ isConnected, setMessage, message, messages, currentRecipent, setCurrentRecipent, person, roomId }) => {
  const picture = null;
  const bottomRef = useRef(null);

  const goDown = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth'})
  }

  const handleClick = () => {
    setMessage('');

    if(message !== ''){
      socket.emit('sendMessage', {recipentId: currentRecipent, message, chatroom: roomId})
    }

    goDown();
  }; 

  const handleBack = () => {
    window.history.back()
    setCurrentRecipent('');
  };

  const handleKeyDown = (e) => {
   if(e.key === 'Enter'){
    handleClick()
   }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.contTwo}>
        <div className={styles.header}>
          <BsArrowLeft fontSize={20} 
            className='cursor-pointer' 
            onClick={handleBack}
          />

          <div className={styles.profileCont}>
            <div className={styles.imgCont}>
            {picture ? <img src={picture} alt='profile picture' className={styles.img} /> 
            : <p className={styles.imgText}>{person?.fullname.charAt(0) || person?.name.charAt(0)}</p>}
            </div>
            <div className='ml-2'>
              <p className={styles.text}>{person?.fullname || person?.name}</p>
              <div className={`${styles.status} ${isConnected ? 'bg-green-600' : 'bg-gray-400'}`} />
            </div>
          </div>
        </div>

        <div className='mt-6 min-h-[450px]' >
         <AllMessage messages={messages} currentRecipent={currentRecipent} />
          <div className={styles.bottomBar} />
        </div>
        
        <div className={styles.contThree}>
          <div className='relative w-full'>
            <input type="text" 
              className={styles.input} 
              onChange={(e) => setMessage(e.target.value)} 
              value={message}
              onKeyDown={handleKeyDown}
            />
            <IoMdSend fontSize={22} className={styles.sendBtn} onClick={handleClick} />
          </div>
        </div>

        <div ref={bottomRef}/>
        <button className={styles.btn} onClick={() => goDown()}><BsArrowDown fontSize={20}/></button>
      </div>
    </div>
  )
}

export default Message