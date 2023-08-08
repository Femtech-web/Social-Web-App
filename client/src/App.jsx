/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { socket } from './socket/connection';
import { Landing, Home, Auth, CreatePost, PostDetail, Prayer, Profile, Peoples, Messages } from './pages';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from './Redux/apiCalls';
import { populateMessages } from './Redux/messageRedux';


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [dbMessages, setDbMessages ] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [])

  useEffect(() => {
    function printMessage(msg){
      console.log(msg);
    }

    socket.on('started', printMessage)

    return () => {
      socket.off('started', printMessage)
    }
  }, [])

  useEffect(() => {
    const getMessages = async () => {
      const allMessages = await fetchMessages();

      setDbMessages(allMessages)
      dispatch(populateMessages(allMessages));
    }

    getMessages();
  }, [dispatch])

  return (
    <Router basename='/'>
      <Routes>
        <Route exact path='/' element={!user ? <Landing /> : <Navigate to='/posts' />} />
        <Route exact path='/auth'  element={!user ? <Auth /> : <Navigate to='/posts' />} />
        <Route exact path='/posts'  element={user ? <Home /> : <Navigate to='/auth' />} />
        <Route exact path='/posts/search'  element={<Home />} />
        <Route exact path='/create-post' element={<CreatePost />} />
        <Route exact path='/posts/:id' element={<PostDetail />} />
        <Route exact path='/prayer' element={<Prayer />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/People' element={<Peoples isConnected={isConnected}/>} />
        <Route exact path='/message/:id' element={<Messages isConnected={isConnected} />} />
      </Routes>
    </Router>
  )
}
export default App
