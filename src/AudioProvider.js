import React from 'react';
import { AudioContext } from "./AudioContext";

export const AudioProvider = ({ children }) => {
  const [audioId, setAudioId] = React.useState('');
  // Function to update the audio source
  const changeAudioId = (audioId) => {
    setAudioId(audioId);
  };
  return (
    <AudioContext.Provider value={{ audioId, setAudioId: changeAudioId }}>
      {children}
    </AudioContext.Provider>
  );
};