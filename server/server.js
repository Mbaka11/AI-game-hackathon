const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let usersInRoom = [];

let games = [];

let answerPosition = 0;

const addUser = (socketId, name, delay) => {
  if (!usersInRoom.some((user) => user.socketId === socketId)) {
    usersInRoom.push({ socketId, name, delay });
  }
};

const removeUser = (socketId) => {
  usersInRoom = usersInRoom.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("create-room", ({ mode, roomId, socketId, name }) => {
    console.log(`User ${socketId} created room ${roomId}`);
    if (io.sockets.adapter.rooms.get(roomId)) {
      console.log(`Room ${roomId} already exists.`);
      socket.emit("room-exists", { error: "Room already exists" });
    } else {
      socket.join(roomId);
      addUser(socket.id, name, 0);
      // Initialize the game object for the room with default values
      games[roomId] = {
        mode: mode,
        nbQuestionTotal: mode === "mode1" ? 2 : 5,
        currentQuestion: 0,
        users: new Map(),
        scoreboard: new Map(),
        gameStarted: false,
      };

      console.log("emit-connected - create room");
      io.to(roomId).emit("user-connected", { usersInRoom });
    }
  });

  socket.on("join-room", ({ roomId, socketId, name }) => {
    console.log(`User ${socketId} joined room ${roomId}`);
    if (io.sockets.adapter.rooms.get(roomId)) {
      socket.join(roomId);
      addUser(socketId, name, 0);
      console.log("emit-connected - join room");
      io.to(roomId).emit("user-connected", { usersInRoom });
    } else {
      console.log(`Room ${roomId} does not exist.`);
      socket.emit("room-not-found", { error: "Room does not exist" });
    }
  });

  socket.on("start-game", ({ roomId }) => {
    if (!io.sockets.adapter.rooms.get(roomId)) {
      socket.emit("room-not-found", { error: "Room does not exist" });
      return;
    }

    // Generate a list of unique question IDs
    let questionIds = generateUniqueQuestionIds(
      games[roomId].nbQuestionTotal,
      games[roomId].mode,
      15
    );

    // Populate the game object's user details now that the game is starting
    games[roomId].users = new Map(
      usersInRoom.map((user) => [
        user.socketId,
        {
          ...user,
          answers: new Array(games[roomId].nbQuestionTotal).fill(null),
        },
      ])
    );
    games[roomId].scoreboard = new Map(
      usersInRoom.map((user) => [user.socketId, 0])
    );
    games[roomId].gameStarted = true; // Set the game as started
    games[roomId].questionIds = questionIds;

    let questionId = questionIds[games[roomId].currentQuestion];
    console.log("first q id: " + questionId);
    let mode = games[roomId].mode;
    console.log("first m id: " + mode);

    answerPosition = 0;

    io.to(roomId).emit("send-question", { questionId, mode });
  });

  socket.on("send-answer", ({ roomId, answer, isCorrect }) => {
    console.log("Answer received " + socket.id);
    const roomGame = games[roomId];

    if (!roomGame) {
      socket.emit("error", { error: "Room does not exist" });
      return;
    }
    if (!roomGame.gameStarted) {
      socket.emit("error", { error: "Game has not started" });
      return;
    }

    // Update the user's answer for the current question
    const userAnswers = roomGame.users.get(socket.id).answers;
    userAnswers[roomGame.currentQuestion] = answer;
    // Determine the position of the user's answer
    const position = ++answerPosition;
    // Calculate the score for the answer and update the scoreboard
    const score = calculateScore(isCorrect, position);
    roomGame.scoreboard.set(
      socket.id,
      (roomGame.scoreboard.get(socket.id) || 0) + score
    );
    // Check if all users have answered the current question
    let allAnswered = true;
    for (let user of roomGame.users.values()) {
      if (user.answers[roomGame.currentQuestion] === null) {
        allAnswered = false;
        break;
      }
    }

    // Check if this is the last question
    const isLastQuestion =
      roomGame.currentQuestion === roomGame.nbQuestionTotal - 1;

    // If all users have answered, emit the scoreboard to the room
    if (allAnswered) {
      // Convert the scoreboard map to an object with user names as keys
      let scoreboardObj = {};
      roomGame.scoreboard.forEach((score, socketId) => {
        const userName = roomGame.users.get(socketId).name;
        scoreboardObj[userName] = score;
      });
      // Convert scoreboardObj into an array of objects with name and points properties
      const scores = Object.keys(scoreboardObj).map((name) => ({
        name: name,
        points: scoreboardObj[name],
      }));
      // Emit the scoreboard with the isLastQuestion flag
      io.to(roomId).emit("end-of-round", {
        scores: scores,
        isLastQuestion: isLastQuestion,
      });
      // If it was the last question, clean up the game state
      if (isLastQuestion) {
        // Perform any necessary cleanup here
        delete games[roomId];
      }
    }
  });

  socket.on("next-question", ({ roomId }) => {
    console.log("Master wants next question" + socket.id);
    const roomGame = games[roomId];
    if (!roomGame) {
      socket.emit("error", { error: "Room does not exist" });
      return;
    }
    if (!roomGame.gameStarted) {
      socket.emit("error", { error: "Game has not started" });
      return;
    }
    // Increment the current question index
    roomGame.currentQuestion += 1;
    // Check if there are still questions left to send
    if (roomGame.currentQuestion < roomGame.nbQuestionTotal) {
      // Get the next question ID from the list
      let nextQuestionId = roomGame.questionIds[roomGame.currentQuestion];
      let mode = games[roomId].mode;
      // Emit the next question to the room

      answerPosition = 0;
      io.to(roomId).emit("send-question", {
        questionId: nextQuestionId,
        mode,
      });

      if (roomGame.currentQuestion === roomGame.nbQuestionTotal) {
        delete games[roomId];
      }
    }
  });

  socket.on("get-users", ({ roomId, socketId }) => {
    socket.emit("get-users", { socketId, usersInRoom });
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
    removeUser(socket.id);
    console.log("emit-connected - disconnect");
    io.emit("user-connected", { usersInRoom });
  });
});

function generateUniqueQuestionIds(totalQuestions, mode, maxQuestionId) {
  let questionIds = new Set();

  if (mode === "mode1") {
    questionIds.add(0);
    questionIds.add(1);
  } else {
    while (questionIds.size < totalQuestions) {
      let randomId = Math.floor(Math.random() * maxQuestionId);
      questionIds.add(randomId);
    }
  }

  return Array.from(questionIds);
}

function calculateScore(isCorrect, position) {
  const randomBonus = Math.floor(Math.random() * 11);
  if (isCorrect) {
    switch (position) {
      case 1:
        return 1000 + randomBonus;
      case 2:
        return 900 + randomBonus;
      case 3:
        return 750 + randomBonus;
      case 4:
        return 500 + randomBonus;
      default:
        return 250 + randomBonus;
    }
  }
  // Return 0 if the answer is not correct
  return 0;
}

server.listen(3001, () => {
  console.log("listening on *:3001");
});
