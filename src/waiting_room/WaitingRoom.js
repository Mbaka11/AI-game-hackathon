import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";
import {
  Container,
  Title,
  UsersList,
  UsersTitle,
  User,
  StatusMessage,
  ActionButton,
  ParentGroup,
  GameModeTitle,
} from "./WaitingRoomStyles";

const WaitingRoomPage = () => {
  const location = useLocation();
  const roomId = location.state?.roomId;
  const waitingUsers = location.state?.users;
  const gameMode = location.state?.mode;

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (waitingUsers) {
      setUsers(waitingUsers);
    }
    socket.on("user-connected", ({ usersInRoom }) => {
      if (roomId) {
        setUsers(usersInRoom);
      }
    });
    socket.on("send-question", ({ questionId, mode }) => {
      console.log("receive send question : " + questionId);
      console.log("receive send mode : " + mode);
      navigate("/question", { state: { questionId, mode, roomId } });
    });
    return () => {
      socket.off("user-connected");
      socket.off("send-question");
    };
  }, []);

  const handleClick = () => {
    console.log("start the game");
    socket.emit("start-game", { roomId });
  };

  const getGameModeTitle = (gameMode) => {
    return gameMode === "mode1" ? "MELODIC LAYERS" : "ILLUSTRATED BEATS";
  };

  return (
    <Container>
      <Title>Waiting Room - Room # {roomId}</Title>
      {gameMode && (
        <GameModeTitle>{getGameModeTitle(gameMode)}</GameModeTitle>
      )}
      <ParentGroup>
        <UsersList>
          <UsersTitle>Users connected:</UsersTitle>
          <ul>
            {users.map((user, index) => (
              <User key={index}>{user.name}</User>
            ))}
          </ul>
        </UsersList>
        <StatusMessage>Waiting for more players to join...</StatusMessage>
      </ParentGroup>
      {localStorage.getItem("creator") === "true" && (
        <ActionButton onClick={handleClick}>Start Game</ActionButton>
      )}
    </Container>
  );
};

export default WaitingRoomPage;
