const { Events } = require("discord.js");
const { io } = require("../bin/server");

// helper function that will attach Event listeners to the client instance passed
const discordEvents = (client) => {
  // Discognito Bot listener that fires when a new message is posted into a channel that the bot has permission
  client.on(Events.MessageCreate, async (message) => {
    console.log(message);
    io.sockets.emit("new message", message.content); // forward message to all Discognito clients connected via socket.io
  });
};

module.exports = discordEvents;
