/* eslint-disable no-unused-vars */

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import { Landing, Home, Auth, CreatePost, PostDetail, Prayer, Profile, Categories } from './pages';
import { useSelector } from 'react-redux';


const App = () => {
  const user = useSelector((state) => state.user.currentUser);

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
        <Route exact path='/Categories' element={<Categories />} />
      </Routes>
    </Router>
  )
}
export default App
