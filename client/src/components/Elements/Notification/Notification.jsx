/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";

const Notification = ({ msg, type }) => {
  return (
    <span
      className={`
        px-6 py-4 border-b-4 bg-white
        fixed z-40 top-10 right-10 shadow-md
        ${type === "error" ? "text-red-600" : "text-green-600"}
       border-black rounded-b-md fadeInOut`}
    >
      {msg}
    </span>
  );
};

export default Notification;
