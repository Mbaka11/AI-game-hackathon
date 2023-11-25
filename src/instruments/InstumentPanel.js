import React, { useEffect, useContext } from 'react';
import Instrument from './Instrument'; // Assuming the Instrument component is in the same directory
import { AudioContext } from '../AudioContext';
import {
  Container
} from "./InstrumentPanelStyle";
const InstrumentPanel = ({ newAudioId, questionFinished }) => {
  const { audioId, setAudioId } = useContext(AudioContext);

  useEffect(() => {
    if (questionFinished) {
      setAudioId(-1);
    }
  }, [questionFinished]);

  useEffect(() => {
    console.log(newAudioId);
    setAudioId(newAudioId);
  }, []);
  return (
    <Container>
      <Instrument logoImage={"/instruments/static/Drums.png"} logoGif={"/instruments/gif/Drums.gif"} delayAnimation={0} />
      <Instrument logoImage={"/instruments/static/Bass.png"} logoGif={"/instruments/gif/Bass.gif"} delayAnimation={8000} />
      <Instrument logoImage={"/instruments/static/Other.png"} logoGif={"/instruments/gif/Other.gif"} delayAnimation={16000} />
      <Instrument logoImage={"/instruments/static/Voice.png"} logoGif={"/instruments/gif/Voice.gif"} delayAnimation={24000} />
    </Container>
    
  );
};
export default InstrumentPanel;