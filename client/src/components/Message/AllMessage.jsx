/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import moment from "moment";

import styles from "./style";

const AllMessage = ({ messages, currentRecipent }) => {
  const isReceiver = (message) => {
    return message.receiver === currentRecipent;
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {messages?.map((message, index) => {
        if (isReceiver(message)) {
          if (message.sender === user.result._id) {
            return (
              <div key={index} className={`justify-end ${styles.msgCont}`}>
                <div className={`bg-red-200 ${styles.msg}`}>
                  <p className="mb-2">{message.message}</p>
                  <span className={styles.msgSpan}>
                    {moment(message.createdAt).format("h:mm")}
                  </span>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className={`justify-start ${styles.msgCont}`}>
                <div className={`bg-white ${styles.msg}`}>
                  <p className="mb-2">{message.message}</p>
                  <span className={styles.msgSpan}>
                    {moment().format("h:mm")}
                  </span>
                </div>
              </div>
            );
          }
        }
      })}
    </div>
  );
};

export default AllMessage;
