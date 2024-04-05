// helper funtion to attach listeners to socket connection
const socketEvents = (socket, io) => {
  // join the passed channel id Room
  socket.on("join channel", (id) => {
    socket.join(id);
  });

  // leave the channel id Room (2nd room in the socket.rooms Set -- 1st room is the socket ID)
  socket.on("leave channel", () => {
    socket.leave(Array.from(socket.rooms)[1]);
  });

  // log socket disconnection and current connected socket count
  socket.on("disconnect", () => {
    console.log("Discognito client disconnected :/");
    console.log("Current connections:", io.sockets.sockets.size);
  });
};

module.exports = socketEvents;
