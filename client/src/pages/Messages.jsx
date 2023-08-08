/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import { addMessages } from '../Redux/messageRedux';
import { socket } from '../socket/connection';
import Message from '../components/Message/Message';
import { fetchPeople } from '../Redux/apiCalls';

const Messages = ({ isConnected }) => {
  const dispatch = useDispatch();
  const persistedMessages = useSelector(state => state.message.messages);
  const params = useParams();
  
  const [message, setMessage ] = useState('');
  const [people, setPeople ] = useState([]);
  const [messages, setMessages ] = useState(persistedMessages);
  const [roomId, setRoomId] = useState('');
  const [currentRecipent, setCurrentRecipent ] = useState('');

  const person = people?.find((person) => person._id === currentRecipent);

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await fetchPeople();

      setPeople(allUsers)
    }

    getUsers();
  }, [])

  useEffect(() => {
    setCurrentRecipent(params.id)
  }, [params.id])

  useEffect(() => {
    function addMessage(msg){
      setMessages((prev) => [...prev, msg])

      dispatch(addMessages(msg))
    }

    function getRoomId(id){
      setRoomId(id);
    }

    socket.on('roomId', getRoomId)
    socket.on('message', addMessage);

    return () => {
      socket.off('roomId', getRoomId)
      socket.off('message', addMessage)
    }

  }, [messages, dispatch])

  return (
    <Message 
      messages={messages} 
      message={message} 
      setMessage={setMessage} 
      isConnected={isConnected} 
      params={params}
      currentRecipent={currentRecipent}
      setCurrentRecipent={setCurrentRecipent}
      person={person}
      roomId={roomId}
    />
  )
}

export default Messages