import React, { useEffect, useRef, useContext } from 'react';
import { AudioContext } from '../AudioContext';
const BackgroundAudio = () => {
    const { audioId } = useContext(AudioContext);
    const audioFiles = ["/songs/doja.mp3","/songs/taylor.mp3"];
    const audioRefs = useRef(audioFiles.map((src) => new Audio(src)));
    const isPlayingRef = useRef(false);
    useEffect(() => {
        // Function to stop all audio tracks
        const stopAllAudio = () => {
            audioRefs.current.forEach((audio) => {
                audio.pause();
                audio.currentTime = 0;
            });
            isPlayingRef.current = false;
        };
        // Function to play the selected audio track
        const playAudioTrack = (audioId) => {
            // const audioIndex = audioFiles.indexOf(src);
            if (audioId !== -1) {
                const audio = audioRefs.current[audioId];
                if (audio) {
                    stopAllAudio(); // Stop all other audio tracks before playing the new one
                    audio.play()
                        .then(() => {
                            isPlayingRef.current = true;
                        })
                        .catch((error) => {
                            console.error("Error playing audio:", error);
                        });
                }
            }
        };
        if (audioId >= 0) {
            console.log(audioId);
            playAudioTrack(audioId);
        } else {
            console.log("stop!");
            stopAllAudio();
        }
        // Cleanup function to stop audio when component unmounts
        return () => stopAllAudio();
    }, [audioId]); // Only re-run the effect if audioSrc changes
    return null; // Nothing is rendered to the DOM
};
export default BackgroundAudio;