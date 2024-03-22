/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";

export const useCustomState = () => {
  const [screenSize, setScreenSize] = useState(null);
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 767) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [screenSize]);

  return [mobile];
};
