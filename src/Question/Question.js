// Question.js
import React, { Component, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Choice from "./Choice";
import "./Question.css";
import { socket } from "../socket/socket";
import songData from "../songs.json";
import SongPlayer from "./SongPlayer";
import ImageQuestion from "../imageQuestion/ImageQuestion";

const Question = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const roomId = location.state?.roomId;
  const [questionId, setQuestionId] = useState(
    Number(location.state?.questionId) || 0
  );
  const mode = location.state?.mode || "mode1";

  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isEndOfRound, setEndOfRound] = useState(false);

  const currentQuestion = songData[mode][questionId];
  const choices = currentQuestion.choices;
  const answerChoice = choices.find((choice) => choice.isAnswer);
  const [revealAnswer, setRevealAnswer] = useState(null);

  useEffect(() => {
    socket.on("end-of-round", ({ scores, isLastQuestion }) => {
      setEndOfRound(true);
      setRevealAnswer(true);
      setTimeout(() => {
        if (isLastQuestion) {
          navigate("/end", {
            state: { scores, roomId, answerChoice, isLastQuestion },
          });
        } else {
          navigate("/score", { state: { scores, roomId, answerChoice } });
        }
      }, 4500);
    });
    return () => {
      setRevealAnswer(false);
      socket.off("end-of-round");
    };
  }, []);

  useEffect(() => {
    let timeoutDuration = mode === "mode1" ? 32000 : 15000;
    const answerTimeout = setTimeout(() => {
      if (!isAnswered) {
        let choice = null;
        setIsAnswered(true);
        socket.emit("send-answer", {
          roomId,
          choice,
          isCorrect: false,
        });
      }
    }, timeoutDuration);

    return () => {
      clearTimeout(answerTimeout);
    };
  }, [isAnswered]);

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
    setIsAnswered(true);

    socket.emit("send-answer", {
      roomId,
      choice,
      isCorrect: choice === answerChoice,
    });
  };

  return (
    <div>
    {isEndOfRound && revealAnswer && (
      <div style={{  backgroundColor: 'rgba(0, 0, 0, 0.7)', height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 999 }}>
        <div className="answer-reveal" >
          <h3>The answer was: {answerChoice.title}</h3>
        </div>
      </div>
    )}
      <div className="question-container">

        {/* Guess the Song section */}
        <div className="guess-song-container">
          <h2>Guess the Song</h2>
          <div className="placeholder-image">
            {mode === "mode1" && (
              <SongPlayer
                questionId={questionId}
                questionFinished={isEndOfRound}
              />
            )}
            {mode === "mode2" && (
              <ImageQuestion questionFinished={isEndOfRound} />
            )}
          </div>
        </div>
        {/* Choices section */}
        <div className="choices-container">
          {choices.map((choice, index) => (
            <Choice
              key={index}
              text={choice.title}
              onClick={() => handleChoiceClick(choice)}
              isSelected={selectedChoice === choice}
              index={index}
              isAnswered={isAnswered}
            />
          ))}
        </div>
      </div>
    </div>

  );
};
export default Question;
