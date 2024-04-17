const http = require("http");
const { Server } = require("socket.io"); // Socket.io package used to set up socket connections to front end client

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

module.exports = { server, io };
