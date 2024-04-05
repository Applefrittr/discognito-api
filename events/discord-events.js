const { Events } = require("discord.js");
const { io } = require("../bin/server");

// helper function that will attach Event listeners to the Discord client instance passed
const discordEvents = (client) => {
  // Discognito Bot listener that fires when a new message is posted into a channel that the bot has permission
  client.on(Events.MessageCreate, (message) => {
    // forward message to sockets currently in the specifc channelId Room
    console.log(message);
    io.sockets
      .to(message.channelId)
      .emit("new message", message, message.author, message.author.avatarURL());
  });
};

module.exports = discordEvents;
