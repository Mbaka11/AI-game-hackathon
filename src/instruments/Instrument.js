import React, { useState, useEffect } from 'react';
import {
  InstrumenTest
} from "./InstrumentStyle";
import drums from "../images/instruments/gif/Drums.gif";
import bass from "../images/instruments/gif/Bass.gif";
import other from "../images/instruments/gif/Other.gif";
import voice from "../images/instruments/gif/Voice.gif";

const Instrument = ({ logoImage, logoGif, delayAnimation }) => {
  // Assuming the public directory contains the 'images' folder
  console.log(logoImage);
  const [currentSrc, setCurrentSrc] = useState(logoImage);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSrc(logoGif);
    }, delayAnimation); // 8000 milliseconds = 8 seconds
    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [logoImage]); // Only re-run the effect if the gifRelativePath changes
  return <InstrumenTest src={currentSrc} alt="Dynamic content" />;
};
export default Instrument;