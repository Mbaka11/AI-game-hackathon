import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Scoreboard.css";
import { socket } from "../socket/socket";
import songData from "../songs.json";

const Scoreboard = ({ height }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const roomId = location.state?.roomId;
  const answerChoice = location.state?.answerChoice;
  const isLastQuestion = location.state?.isLastQuestion || false;
  const scores = (location.state?.scores).sort((a, b) => b.points - a.points);

  useEffect(() => {
    socket.on("send-question", ({ questionId, mode }) => {
      navigate("/question", { state: { questionId, mode, roomId } });
    });
    return () => {
      socket.off("send-question");
    };
  }, []);

  const handleEndClick = () => {
    socket.disconnect();
    socket.connect();
    navigate("/#/home");
  };

  const handleClick = () => {
    socket.emit("next-question", {
      roomId,
    });
  };

  // Define the animation variants for the scoreboard container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren", // Animate the container before its children
        staggerChildren: 0.3, // Stagger the animation of children
        duration: 0.75,
      },
    },
  };
  return (
    <>
      <motion.div
        className="scoreboard"
        initial="hidden"
        animate="visible"
        variants={containerVariants} // Apply the defined variants
        style={{ height: height || "" }}
      >
        <h1>SCOREBOARD</h1>
        <ul>
          {scores.map((winner, index) => {
            const offset = scores.length - index; // Calculate the offset based on index
            return (
              <motion.li
                key={index}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      delay: 0.3 * offset, // Adjust the delay based on the index
                      duration: 0.75, // Maintain a consistent duration for the animation
                    },
                  },
                  hidden: { opacity: 0 },
                }}
              >
                <span className="username">{winner.name}</span>
                <span className="score">{winner.points}</span>
              </motion.li>
            );
          })}
        </ul>
        {localStorage.getItem("creator") === "true" && !isLastQuestion && (
          <button className="scoreboard-button" onClick={handleClick}>Next</button>
        )}
        {isLastQuestion && (
          <button className="scoreboard-button" onClick={() => handleEndClick()}>Home</button>
        )}
      </motion.div>
    </>
  );
};
export default Scoreboard;
