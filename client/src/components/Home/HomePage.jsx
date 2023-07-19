/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Posts from '../posts/Posts';
import PrayerWidget from '../Prayer/PrayerWidget';

const HomePage = () => {
  const location = useLocation();
  const isNotSearchLocation = location.pathname !== '/posts/search';
  const [ searchQuery, setSearchQuery ] = useState('');

  return (
    <div className='flex bg-gray-100 min-h-screen'>
      <Sidebar />
      <div className='md:w-[75%] w-full md:ml-[25%] pl-2'>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className='w-full flex md:mt-[90px] mt-[120px]'>
          {<Posts setSearchQuery={setSearchQuery} isNotSearchLocation={isNotSearchLocation}/> || <div>No post to display</div>}
          {isNotSearchLocation && <PrayerWidget />}
        </div>
      </div>
    </div>
  )
}

export default HomePage