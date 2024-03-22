/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Posts from "../posts/Posts";
import PrayerWidget from "../Prayer/PrayerWidget";
import BottomBar from "../BottomBar/BottomBar";
import { useCustomState } from "../../configs/responsive";
import styles from "./style";

const HomePage = () => {
  const location = useLocation();
  const isNotSearchLocation = location.pathname !== "/posts/search";
  const [searchQuery, setSearchQuery] = useState("");
  const [mobile] = useCustomState();

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.middleContainer}>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className={styles.bottomContainer(mobile)}>
          {(
            <Posts
              setSearchQuery={setSearchQuery}
              isNotSearchLocation={isNotSearchLocation}
            />
          ) || <div>No post to display</div>}
          {isNotSearchLocation && <PrayerWidget />}
        </div>
        {mobile && <BottomBar />}
      </div>
    </div>
  );
};

export default HomePage;
