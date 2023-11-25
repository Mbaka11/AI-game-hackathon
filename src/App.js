import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImageRight from './images/backgrounds/right.png';
import backgroundImageLeft from './images/backgrounds/left.png';
import HomePage from './home/HomePage.js';
import StartUp from './startup/StartUp.js';
import GameMode from './game_mode/GameMode.js';
import Question from './Question/Question.js';
import Scoreboard from './Scoreboard/Scoreboard.js'
import Podium from './Podium/Podium.js'
import podiumData from './Podium/data.js'
import Username from './username/Username';
import Instrument from './instruments/Instrument';
import WaitingRoom from './waiting_room/WaitingRoom';
import GlobalFonts from './fonts/fonts';
import ImageQuestion from './imageQuestion/ImageQuestion.js'
import InstrumentPanel from './instruments/InstumentPanel';
import Clock from './clock/Clock';
import SongPlayer from './Question/SongPlayer.js';
import { HashRouter } from 'react-router-dom';
import BackgroundAudio from './Question/BackgroundAudio.js';

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-size: auto 100%;
  background-color: #15191c
`;

const LeftImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%; /* ou la taille que vous voulez */
  background: url(${backgroundImageLeft}) no-repeat left center fixed;
  background-size: auto 100%;; /* ou adjustez selon vos besoins */
`;
const RightImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%; /* ou la taille que vous voulez */
  background: url(${backgroundImageRight}) no-repeat right center fixed;
  background-size: auto 100%;; /* ou adjustez selon vos besoins */
`;

function App() {
  return (
    <>
    <BackgroundAudio songPath={null}/>
    <HashRouter><GlobalFonts /><LeftImage /> <RightImage />
      <AppContainer>
        <Routes>
          <Route path="/" element={<StartUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/game-mode" element={<GameMode />} />
          <Route path="/question" element={<Question />} />
          <Route path="/username" element={<Username />} />
          <Route path="/waiting-room" element={<WaitingRoom />} />
          <Route path="/instrument" element={<InstrumentPanel />} />
          <Route path="/clock" element={<Clock mode={1}/>} />
          <Route path="/song" element={<SongPlayer songPath={1}/>} />
          <Route path="/score" element={<Scoreboard scores={podiumData} title={'Scoreboard'} />} />
          <Route path="/end" element={<Podium scores={podiumData} />}/>
          <Route path="/image-question" element={<ImageQuestion />}/>
        </Routes>
      </AppContainer>
    </HashRouter>
    </>
  );
}

export default App;