// Choice.js
import React from "react";
import "./Choice.css";

const colors = ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4"];

const Choice = ({ text, onClick, isSelected, index, isAnswered }) => {
  const colorStyle = {
    backgroundColor: colors[index % colors.length],
    boxShadow: isSelected
      ? `0 0 20px ${colors[index % colors.length]}`
      : "none",
    opacity: isAnswered && !isSelected ? 0.5 : 1, // Only reduce opacity for unselected choices after a choice is made
    cursor: isAnswered ? "default" : "pointer", // Change cursor to default if an answer has been selected
  };

  return (
    <button
      className={`choice ${isSelected ? "" : "unselected"}`}
      onClick={onClick}
      style={colorStyle}
      disabled={isAnswered}
    >
      {text}
    </button>
  );
};
export default Choice;
