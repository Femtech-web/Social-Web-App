/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchPeople } from '../../Redux/apiCalls';
import { socket } from '../../socket/connection';
import { Spinner } from '../Elements';
import Sidebar from '../Sidebar/Sidebar';
import styles from './style';

const People = () => {
    const [people, setPeople ] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    const picture = null;
    const navigate = useNavigate();

    const handleClick = (id) => {
        if(id){
            socket.emit('join room', id)
        }
        
        navigate(`/message/${id}`)
    }

    useEffect(() => {
        const getUsers = async () => {
            const allUsers = await fetchPeople();

            setPeople(allUsers)
        }

        getUsers();
    }, [])

    if(!people){
        return <Spinner />
    }

  return (
    <div className={styles.container}>
        <Sidebar />
        <div className={styles.contTwo}>
            <h1 className={styles.header}>People</h1>
            <div className='mt-6'>
                {people?.map((person, index) => (
                    person._id === user.result._id 
                    ? null
                    : <div key={index} className={styles.profileCont}>
                        <div className={styles.imgCont}>
                            {picture ? <img src={picture} alt='profile picture' className={styles.img} /> 
                            : <p className={styles.imgText}>{person.fullname.charAt(0) || person.name.charAt(0)}</p>}
                        </div>
                        <div className='ml-2'>
                            <p className={styles.text}>{person.fullname || person.name}</p>
                            <button type='button' className={styles.btn} onClick={() => handleClick(person._id)}>message</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default People