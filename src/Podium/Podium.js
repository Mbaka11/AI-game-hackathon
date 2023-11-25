import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Scoreboard from "../Scoreboard/Scoreboard";
import PodiumStep from "./PodiumStep";
import Confetti from "react-confetti";

const Podium = () => {
  const location = useLocation();
  const { scores, roomId, answerChoice, isLastQuestion } = location.state || {};

  const [showScoreboard, setShowScoreboard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    // Timer for the confetti to show after 7.5 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(true);
    }, 7500);
    // Timer for the scoreboard to show after 8.5 seconds
    const scoreboardTimer = setTimeout(() => {
      setShowScoreboard(true);
    }, 8500);
    return () => {
      // Clear the timers if the component unmounts
      clearTimeout(confettiTimer);
      clearTimeout(scoreboardTimer);
      // Stop the confetti when the component unmounts
      setShowConfetti(false);
    };
  }, []); // The empty dependency array ensures this effect only runs once
  const sortedWinners = scores.sort((a, b) => b.points - a.points);
  const topWinners = sortedWinners
    .slice(0, 5)
    .map((winner, position) => ({ ...winner, position }));
  const otherWinners = sortedWinners.slice(5);
  const podium = [8, 6, 4, 2, 0, 1, 3, 5, 7, 9]
    .reduce(
      (podiumOrder, position) => [...podiumOrder, topWinners[position]],
      []
    )
    .filter(Boolean);
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridAutoFlow: "column dense",
          gap: ".5rem",
          marginTop: "2rem",
          justifyContent: "center",
          justifyItems: "center",
          alignContent: "flex-end",
          alignItems: "flex-end",
          height: "40vh", // Set the height for the podium here
        }}
      >
        {podium.map((winner, index) => (
          <PodiumStep key={index} podium={topWinners} winner={winner} />
        ))}
      </div>
      {showScoreboard && <Scoreboard height={"30vh"} />}{" "}
      {/* Pass the height as a prop */}
      {showConfetti && <Confetti />}
    </div>
  );
};
export default Podium;
