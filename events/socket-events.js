// helper funtion to attach listeners to socket connection
const socketEvents = (socket) => {
  // join the passed channel id Room
  socket.on("join channel", (id) => {
    socket.join(id);
  });

  // leave the channel id Room (2nd room in the socket.rooms Set)
  socket.on("leave channel", () => {
    socket.leave(Array.from(socket.rooms)[1]);
  });
};

module.exports = socketEvents;
