import React, { useState, useEffect, useRef } from 'react';
import './Clock.css';
const Clock = ({ mode, questionFinished }) => {
    const videoRef = useRef(null);
    const [currentSrc, setCurrentSrc] = useState(mode === 1 ? '/clock/clock_1.mp4' : '/clock/clock_2.mp4');
    const [finished, setFinished] = useState(questionFinished);
    let finishTime;
    if (mode == 1) {
        finishTime = 32;
    } else {
        finishTime = 15;
    }
    useEffect(() => {
        // When the source changes, play the video from the beginning
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(error => console.error('Play failed', error));
        }
    }, [currentSrc]);
    useEffect(() => {
        if (questionFinished == true) {
            skipTo(finishTime);
        }
    }, [questionFinished]);
    // Example function to skip ahead in the video
    const skipTo = (seconds) => {
        if (videoRef.current) {
            videoRef.current.currentTime = seconds;
        }
    };
    // Call this function when you want to skip ahead in the video
    // skipTo(10); // Skips to 10 seconds in the video
    return (
        <video className="clock-video" ref={videoRef} autoPlay playsInline><source src={currentSrc} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};
export default Clock;