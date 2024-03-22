/* eslint-disable no-unused-vars */

import React from "react";
import PrayerRequest from "../components/Prayer/PrayerRequest";
import BottomBar from "../components/BottomBar/BottomBar";
import { useCustomState } from "../configs/responsive";

const Prayer = () => {
  const [mobile] = useCustomState();

  return (
    <div>
      <PrayerRequest />
      {mobile && <BottomBar />}
    </div>
  );
};

export default Prayer;
