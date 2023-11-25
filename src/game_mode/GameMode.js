import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GameModeContainer,
  GameModeTitle,
  GameModeButton,
  ParentGroup,
  GameTitle,
  GameDescription,
  ElementsContainer,
  GameLogo,
} from "./GameModeStyles";
import MelodicLayers from "../images/gamemode/MelodicLayers.png";
import IlustratedBeats from "../images/gamemode/IlustratedBeats.png";
import { socket } from "../socket/socket";

const GameModeSelection = () => {
  const location = useLocation();
  const name = location.state?.name;

  const navigate = useNavigate();

  const generateRandomRoomId = () => {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleClick = (mode) => {
    const roomId = generateRandomRoomId();
    socket.emit("create-room", {
      mode: mode,
      roomId: roomId,
      socketId: socket.id,
      name,
    });
    navigate("/waiting-room", { state: { roomId, mode } });
  };
  return (
    <GameModeContainer>
      <GameModeTitle> Select the Game Mode </GameModeTitle>
      <ElementsContainer>
        <ParentGroup onClick={() => handleClick("mode1")}>
          <GameTitle>MELODIC LAYERS</GameTitle>
          <GameDescription>
            Guess the song as the symphony builds every 8 seconds.
          </GameDescription>
          <GameLogo src={MelodicLayers} alt="MelodicLayers" />
        </ParentGroup>
        <ParentGroup onClick={() => handleClick("mode2")}>
          <GameTitle>ILLUSTRATED BEATS </GameTitle>
          <GameDescription>Guess the song as the image reveals.</GameDescription>
          <GameLogo src={IlustratedBeats} alt="IlustratedBeats" />
        </ParentGroup>
      </ElementsContainer>
    </GameModeContainer>
  );
};
export default GameModeSelection;
