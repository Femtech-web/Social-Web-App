/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { useCustomState } from "../configs/responsive";
import People from "../components/People/People";
import BottomBar from "../components/BottomBar/BottomBar";

const Peoples = ({ isConnected }) => {
  const [mobile] = useCustomState();

  return (
    <div>
      <People isConnected={isConnected} />
      {mobile && <BottomBar />}
    </div>
  );
};

export default Peoples;
