import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  Container,
  InputUsername,
  InputRoom,
  JoinButton,
  CreateRoomButton,
  Logo,
  OrSeparator,
  InputButtonWrapper,
  ErrorMessage,
  ParentRoomGroup,
} from "./HomePageStyles";
import logoImage from "../images/logo/logo_home.png";
import { socket } from "../socket/socket";

const HomePage = () => {
  const [inProp, setInProp] = useState(false);
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Hide overflow when enter starts
    setInProp(true);

    // Clean up overflow style when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleRoomNotFound = () => {
      setError("Room not found. Please check the room ID and try again.");
    };
    const handleUserConnected = (users) => {
      navigate("/waiting-room", { state: { roomId, users } });
    };
    socket.on("room-not-found", handleRoomNotFound);
    socket.on("user-connected", ({ usersInRoom }) => {
      handleUserConnected(usersInRoom);
    });
    return () => {
      socket.off("room-not-found", handleRoomNotFound);
      socket.off("user-connected", handleUserConnected);
    };
  }, [roomId, name, navigate]);

  const handleCreateClick = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    localStorage.setItem("creator", "true");

    navigate("/game-mode", { state: { name } });
  };

  const handleJoinRoom = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!roomId.trim()) {
      setError("Please enter a room ID.");
      return;
    }

    localStorage.setItem("creator", "false");

    socket.emit("join-room", { roomId, socketId: socket.id, name });

    const handleRoomNotFound = () => {
      setError("Room not found. Please check the room ID and try again.");
    };
    const handleUserConnected = (users) => {
      navigate("/waiting-room", { state: { roomId, users } });
    };

    socket.on("room-not-found", handleRoomNotFound);
    socket.on("user-connected", ({ usersInRoom }) => {
      handleUserConnected(usersInRoom);
    });

    return () => {
      socket.off("room-not-found", handleRoomNotFound);
      socket.off("user-connected", handleUserConnected);
    };
  };

  return (
    <>
      <CSSTransition
        in={inProp}
        timeout={500}
        classNames="home"
        onEntered={() => {
          document.body.style.overflow = ""; // Reset overflow after enter ends
        }}
      >
        <Container>
          <Logo src={logoImage} alt="logo" />
          <div style={{ width: "300px" }}>
            <InputUsername
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(""); // Clear error when user starts typing
              }}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ParentRoomGroup>
              <InputButtonWrapper>
                <InputRoom
                  type="text"
                  placeholder="Room #"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
                <JoinButton onClick={handleJoinRoom}>Join</JoinButton>
              </InputButtonWrapper>
            </ParentRoomGroup>
            <OrSeparator>OR</OrSeparator>
            <CreateRoomButton onClick={handleCreateClick}>
              Create Room
            </CreateRoomButton>
          </div>
        </Container>
      </CSSTransition>
    </>
  );
};

export default HomePage;
