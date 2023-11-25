import Clock from "../clock/Clock";
import Instrument from "../instruments/Instrument";
import InstrumentPanel from "../instruments/InstumentPanel";
import BackgroundAudio from "./BackgroundAudio";
import React, { useState, useEffect, useRef } from 'react';
import "./SongPlayer.css";

const SongPlayer = ({questionId , questionFinished}) => {
    // const [eor, setEor] = useState(questionFinished);

    return (
        <div className="container">
            <Clock mode={1} questionFinished={questionFinished}/>
            <InstrumentPanel newAudioId={questionId} questionFinished={questionFinished} />
        </div>
    )
}
export default SongPlayer;