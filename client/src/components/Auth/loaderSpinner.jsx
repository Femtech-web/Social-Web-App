/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';

const LoaderSpinner = ({ styles, variant }) => {
  return (
    <div className={`${styles} ${variant} rounded-full animate-spin`} />
  )
}

export default LoaderSpinner