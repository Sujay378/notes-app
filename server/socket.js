const { Server } = require("socket.io");
const { corsOpt } = require("./cors");

let io = new Server();

const initiateIO = (server) => {
  io.attach(server, {
    cors: corsOpt,
  });

  io.on("connection", (socket) => {
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
    });
  });
};

module.exports = { initiateIO, io };
