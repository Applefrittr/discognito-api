const { Events } = require("discord.js");

// helper function that will attach Event listeners to the client instance passed
const discordEvents = (client) => {
  // Testing message listening
  client.on(Events.MessageCreate, async (message) => {
    console.log(message);
  });
};

module.exports = discordEvents;
