/* eslint-disable no-unused-vars */

import React from "react";
import User from "../components/Profile/User";
import BottomBar from "../components/BottomBar/BottomBar";
import { useCustomState } from "../configs/responsive";

const Profile = () => {
  const [mobile] = useCustomState();

  return (
    <div>
      <User />
      {mobile && <BottomBar />}
    </div>
  );
};

export default Profile;
